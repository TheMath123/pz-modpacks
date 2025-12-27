import { ApiResponse } from '@/utils'
import type { ListModsUseCase } from '../use-cases/list-mods'

interface ListModsControllerParams {
  query: {
    page?: string
    limit?: string
    search?: string
    sortBy?: 'createdAt' | 'updatedAt'
    sortOrder?: 'asc' | 'desc'
    tags?: string
  }
}

export class ListModsController {
  constructor(private listModsUseCase: ListModsUseCase) {}

  async handle({ query }: ListModsControllerParams) {
    const page = query.page ? parseInt(query.page, 10) : 1
    const limit = query.limit ? parseInt(query.limit, 10) : 10
    const { search, sortBy, sortOrder, tags } = query

    const tagsArray = tags ? tags.split(',').filter(Boolean) : undefined

    const result = await this.listModsUseCase.execute({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      tags: tagsArray,
    })

    return new ApiResponse(result, 200)
  }
}
