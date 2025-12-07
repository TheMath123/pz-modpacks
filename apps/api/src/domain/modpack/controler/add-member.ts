import { modpackRepository, userRepository } from '@org/database'
import type { User } from '@/domain/types/auth'
import { ApiResponse } from '@/utils'
import type { AddMemberSchema, ModpackIdParam } from '../validations'

interface AddMemberControllerParams {
  params: ModpackIdParam
  body: AddMemberSchema
  user: User
}

export async function addMemberController({
  params,
  body,
  user,
}: AddMemberControllerParams) {
  const modpack = await modpackRepository.findById(params.id)

  if (!modpack) {
    return new ApiResponse(
      {
        error: {
          message: 'Modpack not found',
        },
      },
      404,
    )
  }

  // Check if user is the owner
  if (modpack.owner !== user.id) {
    return new ApiResponse(
      {
        error: {
          message: 'Only the owner can add members to this modpack',
        },
      },
      403,
    )
  }

  // Find user by email
  const memberUser = await userRepository.findByEmail(body.email)
  if (!memberUser) {
    return new ApiResponse(
      {
        error: {
          message: 'User not found with this email',
        },
      },
      404,
    )
  }

  // Check if user is already a member
  const isMember = await modpackRepository.isMember(params.id, memberUser.id)
  if (isMember) {
    return new ApiResponse(
      {
        error: {
          message: 'User is already a member of this modpack',
        },
      },
      409,
    )
  }

  const member = await modpackRepository.addMember({
    modpackId: params.id,
    userId: memberUser.id,
    permission: body.permission,
  })

  return new ApiResponse(member, 201)
}
