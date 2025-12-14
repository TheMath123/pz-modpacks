import type { User } from '@org/auth/types'
import { modpackMemberRepository, modpackRepository } from '@org/database'
import { ApiResponse } from '@/utils'
import type { ModpackIdParam } from '../validations'

interface ListMembersControllerParams {
  params: ModpackIdParam
}

export async function listMembersController({
  params,
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

  if (modpack.isPublic) {
    const members = await modpackMemberRepository.findMembers(params.id)
    return new ApiResponse(members, 200)
  }

  const members = await modpackMemberRepository.findMembers(params.id)

  return new ApiResponse(members, 200)
}
