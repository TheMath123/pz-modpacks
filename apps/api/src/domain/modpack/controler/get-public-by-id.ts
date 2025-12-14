import { modpackRepository } from '@org/database'
import { ApiResponse } from '@/utils'
import type { ModpackIdParam } from '../validations'

interface GetPublicModpackByIdControllerParams {
  params: ModpackIdParam
}

export async function getPublicModpackByIdController({
  params,
}: GetPublicModpackByIdControllerParams) {
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

  if (!modpack.isPublic) {
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
