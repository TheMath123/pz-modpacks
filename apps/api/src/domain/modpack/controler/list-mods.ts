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
    tags?: string
  }
}

export async function listModsController({ query }: ListModsControllerParams) {
  const { modpackId, page, limit, search, sortBy, sortOrder, tags } = query

  if (!modpackId) {
    return new ApiResponse(
      { error: { message: 'Modpack ID is required' } },
      400,
    )
  }

  const tagsArray = tags ? tags.split(',').filter(Boolean) : undefined

  const result = await modRepository.list({
    modpackId,
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 10,
    search,
    sortBy,
    sortOrder,
    tags: tagsArray,
  })

  return new ApiResponse(result, 200)
}
