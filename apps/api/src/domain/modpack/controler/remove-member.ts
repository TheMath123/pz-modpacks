import { modpackRepository } from '@org/database'
import type { User } from '@/domain/types/auth'
import { ApiResponse } from '@/utils'
import type { MemberIdParam } from '../validations'

interface RemoveMemberControllerParams {
  params: MemberIdParam
  user: User
}

export async function removeMemberController({
  params,
  user,
}: RemoveMemberControllerParams) {
  const modpack = await modpackRepository.findById(params.modpackId)

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
          message: 'Only the owner can remove members from this modpack',
        },
      },
      403,
    )
  }

  // Check if member exists
  const isMember = await modpackRepository.isMember(
    params.modpackId,
    params.memberId,
  )
  if (!isMember) {
    return new ApiResponse(
      {
        error: {
          message: 'User is not a member of this modpack',
        },
      },
      404,
    )
  }

  await modpackRepository.removeMember(params.modpackId, params.memberId)

  return new ApiResponse(
    {
      message: 'Member removed successfully',
    },
    200,
  )
}
