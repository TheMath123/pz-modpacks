import { modRepository } from '@org/database'
import { ApiResponse } from '@/utils'

interface ListModsControllerParams {
  query: {
    modpackId: string
    page?: string
    limit?: string
    search?: string
    sortBy?: 'createdAt' | 'updatedAt' | 'name'
    sortOrder?: 'asc' | 'desc'
    tags?: string | string[]
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

  let tagsArray: string[] | undefined

  if (Array.isArray(tags)) {
    tagsArray = tags
  } else if (typeof tags === 'string') {
    tagsArray = tags.split(',').filter(Boolean)
  }

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
