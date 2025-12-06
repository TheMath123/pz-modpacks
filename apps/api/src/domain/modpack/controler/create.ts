import { modpackRepository } from '@org/database'
import type { User } from '@/domain/types/auth'
import { ApiResponse } from '@/utils'
import type { CreateModpackSchema } from '../validations'

interface CreateModpackControllerParams {
  body: CreateModpackSchema
  user: User
}
export async function createModpackController({
  body,
  user,
}: CreateModpackControllerParams) {
  const isExistModpack = await modpackRepository.findByName(body.name)

  if (isExistModpack) {
    return new ApiResponse(
      {
        error: {
          message: 'Modpack with this name already exists',
        },
      },
      409,
    )
  }

  const data = await modpackRepository.create({
    name: body.name,
    description: body.description,
    avatarUrl: body.avatarUrl,
    isPublic: body.isPublic,
    steamUrl: body.steamWorkshopUrl,
    owner: user.id,
  })

  return new ApiResponse(data, 201)
}
