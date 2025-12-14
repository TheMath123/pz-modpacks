import { and, eq } from 'drizzle-orm'
import { database } from '../index'
import type { DModpackMember } from '../schemas'
import { modpacks, modpacksMembers, users } from '../schemas'

export interface AddModpackMemberData {
  modpackId: string
  userId: string
  permission: string[]
  isActive?: boolean
}

export class ModpackMemberRepository {
  /**
   * Add a member to the modpack
   */
  async addMember(data: AddModpackMemberData): Promise<DModpackMember> {
    const [member] = await database
      .insert(modpacksMembers)
      .values({
        modpackId: data.modpackId,
        userId: data.userId,
        permission: data.permission,
        isActive: data.isActive ?? true,
      })
      .returning()

    return member
  }

  /**
   * Remove a member from the modpack (soft delete - marks as inactive)
   */
  async removeMember(modpackId: string, userId: string): Promise<void> {
    await database
      .update(modpacksMembers)
      .set({
        isActive: false,
      })
      .where(
        and(
          eq(modpacksMembers.modpackId, modpackId),
          eq(modpacksMembers.userId, userId),
        ),
      )
  }

  /**
   * Find all members of a modpack (active only) with user information
   */
  async findMembers(modpackId: string) {
    // Get modpack owner
    const modpack = await database.query.modpacks.findFirst({
      where: eq(modpacks.id, modpackId),
      columns: {
        owner: true,
      },
    })

    if (!modpack) return []

    // Get owner user details
    const ownerUser = await database.query.users.findFirst({
      where: eq(users.id, modpack.owner),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    const result = await database
      .select({
        member: modpacksMembers,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(modpacksMembers)
      .innerJoin(users, eq(modpacksMembers.userId, users.id))
      .where(
        and(
          eq(modpacksMembers.modpackId, modpackId),
          eq(modpacksMembers.isActive, true),
        ),
      )

    const members = result.map((r) => ({
      ...r.member,
      user: r.user,
    }))

    // Remove owner from members list if present (to avoid duplication)
    const filteredMembers = members.filter((m) => m.userId !== modpack.owner)

    if (ownerUser) {
      // Create a fake member object for the owner
      const ownerMember = {
        id: crypto.randomUUID(),
        modpackId: modpackId,
        userId: ownerUser.id,
        isActive: true,
        permission: ['owner'],
        createdAt: new Date(),
        updatedAt: new Date(),
        user: ownerUser,
      }

      return [ownerMember, ...filteredMembers]
    }

    return filteredMembers
  }

  /**
   * Find a member by modpack ID and user email
   */
  async findByEmailMember(
    modpackId: string,
    email: string,
  ): Promise<DModpackMember | undefined> {
    const result = await database
      .select({
        member: modpacksMembers,
      })
      .from(modpacksMembers)
      .innerJoin(users, eq(modpacksMembers.userId, users.id))
      .where(
        and(
          eq(modpacksMembers.modpackId, modpackId),
          eq(users.email, email),
          eq(modpacksMembers.isActive, true),
        ),
      )
      .limit(1)

    return result[0]?.member
  }

  /**
   * Find a member by modpack ID and user ID
   */
  async findMember(
    modpackId: string,
    userId: string,
  ): Promise<DModpackMember | undefined> {
    return database.query.modpacksMembers.findFirst({
      where: and(
        eq(modpacksMembers.modpackId, modpackId),
        eq(modpacksMembers.userId, userId),
      ),
    })
  }

  /**
   * Check if a user is a member of a modpack (active only)
   */
  async isMember(modpackId: string, userId: string): Promise<boolean> {
    const member = await database.query.modpacksMembers.findFirst({
      where: and(
        eq(modpacksMembers.modpackId, modpackId),
        eq(modpacksMembers.userId, userId),
        eq(modpacksMembers.isActive, true),
      ),
    })

    return !!member
  }

  /**
   * Update member permissions
   */
  async updatePermissions(
    modpackId: string,
    userId: string,
    permissions: string[],
  ): Promise<DModpackMember> {
    const [member] = await database
      .update(modpacksMembers)
      .set({
        permission: permissions,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(modpacksMembers.modpackId, modpackId),
          eq(modpacksMembers.userId, userId),
        ),
      )
      .returning()

    return member
  }
}

export const modpackMemberRepository = new ModpackMemberRepository()
