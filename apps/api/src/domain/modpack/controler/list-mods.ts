import { modRepository } from '@org/database'
import { ApiResponse } from '@/utils'

interface ListModsControllerParams {
  query: {
    modpackId: string
    page?: string
    limit?: string
    search?: string
    sortBy?: 'createdAt' | 'updatedAt'
    sortOrder?: 'asc' | 'desc'
  }
}

export async function listModsController({ query }: ListModsControllerParams) {
  const { modpackId, page, limit, search, sortBy, sortOrder } = query

  if (!modpackId) {
    return new ApiResponse(
      { error: { message: 'Modpack ID is required' } },
      400,
    )
  }

  const result = await modRepository.list({
    modpackId,
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 10,
    search,
    sortBy,
    sortOrder,
  })

  return new ApiResponse(result, 200)
}
