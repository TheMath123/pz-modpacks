import { ApiResponse } from '@/utils'
import type { ListTagsUseCase } from '../use-cases/list-tags'

export class ListTagsController {
  constructor(private listTagsUseCase: ListTagsUseCase) {}

  async handle() {
    const result = await this.listTagsUseCase.execute()
    return new ApiResponse(result, 200)
  }
}
