import type { User } from '@org/auth/types'
import { modpackRepository } from '@org/database'
import { ApiResponse } from '@/utils'
import type { ModpackIdParam } from '../validations'

interface GetModpackByIdControllerParams {
  params: ModpackIdParam
  user: User
}

export async function getModpackByIdController({
  params,
  user,
}: GetModpackByIdControllerParams) {
  const modpack = await modpackRepository.findWithMembers(params.id)

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

  // Check if user has access (owner or member)
  const isOwner = modpack.owner === user.id
  const isMember = modpack.members.some((member) => member.userId === user.id)

  if (!isOwner && !isMember && !modpack.isPublic) {
    return new ApiResponse(
      {
        error: {
          message: 'You do not have access to this modpack',
        },
      },
      403,
    )
  }

  return new ApiResponse(modpack, 200)
}
