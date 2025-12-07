import { modpackRepository } from '@org/database'
import type { User } from '@/domain/types/auth'
import { ApiResponse } from '@/utils'
import type { ModpackIdParam } from '../validations'

interface ListMembersControllerParams {
  params: ModpackIdParam
  user: User
}

export async function listMembersController({
  params,
  user,
}: ListMembersControllerParams) {
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

  // Check if user is owner or member
  const isOwner = modpack.owner === user.id
  const isMember = await modpackRepository.isMember(params.id, user.id)

  if (!isOwner && !isMember) {
    return new ApiResponse(
      {
        error: {
          message: 'You do not have permission to view members of this modpack',
        },
      },
      403,
    )
  }

  const members = await modpackRepository.findMembers(params.id)

  return new ApiResponse(members, 200)
}
