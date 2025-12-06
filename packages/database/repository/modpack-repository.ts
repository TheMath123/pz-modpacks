import { and, eq } from 'drizzle-orm'
import { database } from '../index'
import type { DModpack, DModpackMember } from '../schemas'
import { modpacks, modpacksMembers } from '../schemas'

export interface CreateModpackData {
  name: string
  description?: string | null
  mods?: string[] | null
  avatarUrl?: string | null
  steamUrl?: string | null
  owner: string
  isPublic?: boolean
  isActive?: boolean
}

export interface UpdateModpackData {
  name?: string
  description?: string | null
  mods?: string[] | null
  avatarUrl?: string | null
  steamUrl?: string | null
  isPublic?: boolean
  isActive?: boolean
}

export interface AddModpackMemberData {
  modpackId: string
  userId: string
  permission: string[]
  isActive?: boolean
}

export class ModpackRepository {
  /**
   * Find a modpack by ID (active only)
   */
  async findById(id: string): Promise<DModpack | undefined> {
    return database.query.modpacks.findFirst({
      where: and(eq(modpacks.id, id), eq(modpacks.isActive, true)),
    })
  }

  /**
   * Find a modpack by name (active only)
   */
  async findByName(name: string): Promise<DModpack | undefined> {
    return database.query.modpacks.findFirst({
      where: and(eq(modpacks.name, name), eq(modpacks.isActive, true)),
    })
  }

  /**
   * Find all modpacks owned by a user (active only)
   */
  async findByOwner(ownerId: string): Promise<DModpack[]> {
    return database.query.modpacks.findMany({
      where: and(eq(modpacks.owner, ownerId), eq(modpacks.isActive, true)),
    })
  }

  /**
   * Find all public modpacks (active only)
   */
  async findPublic(): Promise<DModpack[]> {
    return database.query.modpacks.findMany({
      where: and(eq(modpacks.isPublic, true), eq(modpacks.isActive, true)),
    })
  }

  /**
   * Create a new modpack
   */
  async create(data: CreateModpackData): Promise<DModpack> {
    const [modpack] = await database
      .insert(modpacks)
      .values({
        name: data.name,
        description: data.description,
        mods: data.mods,
        avatarUrl: data.avatarUrl,
        steamUrl: data.steamUrl,
        owner: data.owner,
        isPublic: data.isPublic ?? false,
        isActive: data.isActive ?? true,
      })
      .returning()

    return modpack
  }

  /**
   * Update an existing modpack
   */
  async update(id: string, data: UpdateModpackData): Promise<DModpack> {
    const [modpack] = await database
      .update(modpacks)
      .set({
        ...data,
      })
      .where(eq(modpacks.id, id))
      .returning()

    return modpack
  }

  /**
   * Delete a modpack (soft delete - marks as inactive)
   */
  async delete(id: string): Promise<void> {
    await database
      .update(modpacks)
      .set({
        isActive: false,
      })
      .where(eq(modpacks.id, id))
  }

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
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(modpacksMembers.modpackId, modpackId),
          eq(modpacksMembers.userId, userId),
        ),
      )
  }

  /**
   * Find all members of a modpack (active only)
   */
  async findMembers(modpackId: string): Promise<DModpackMember[]> {
    return database.query.modpacksMembers.findMany({
      where: and(
        eq(modpacksMembers.modpackId, modpackId),
        eq(modpacksMembers.isActive, true),
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
   * Check if a user is the owner of a modpack (active only)
   */
  async isOwner(modpackId: string, userId: string): Promise<boolean> {
    const modpack = await database.query.modpacks.findFirst({
      where: and(
        eq(modpacks.id, modpackId),
        eq(modpacks.owner, userId),
        eq(modpacks.isActive, true),
      ),
    })

    return !!modpack
  }

  /**
   * Find modpack with its members (active only)
   */
  async findWithMembers(id: string): Promise<
    | (DModpack & {
        members: DModpackMember[]
      })
    | undefined
  > {
    return database.query.modpacks.findFirst({
      where: and(eq(modpacks.id, id), eq(modpacks.isActive, true)),
      with: {
        members: {
          where: eq(modpacksMembers.isActive, true),
        },
      },
    })
  }

  /**
   * Find all modpacks where the user is a member (active only)
   */
  async findByMember(userId: string): Promise<DModpack[]> {
    const members = await database.query.modpacksMembers.findMany({
      where: and(
        eq(modpacksMembers.userId, userId),
        eq(modpacksMembers.isActive, true),
      ),
      with: {
        modpack: true,
      },
    })

    return members
      .filter((member) => member.modpack.isActive)
      .map((member) => member.modpack)
  }
}

export const modpackRepository = new ModpackRepository()
