import { modpackRepository } from '@org/database'
import type { User } from '@/domain/types/auth'
import { ApiResponse } from '@/utils'
import type { ModpackIdParam } from '../validations'

interface ArchiveModpackControllerParams {
  params: ModpackIdParam
  user: User
}

export async function archiveModpackController({
  params,
  user,
}: ArchiveModpackControllerParams) {
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
          message: 'Only the owner can archive this modpack',
        },
      },
      403,
    )
  }

  await modpackRepository.delete(params.id)

  return new ApiResponse(
    {
      message: 'Modpack archived successfully',
    },
    200,
  )
}
