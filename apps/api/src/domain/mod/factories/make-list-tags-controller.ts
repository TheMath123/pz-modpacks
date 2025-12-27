import { tagRepository } from '@org/database'
import { ListTagsController } from '../controllers/list-tags.controller'
import { ListTagsUseCase } from '../use-cases/list-tags'

export function makeListTagsController() {
  const useCase = new ListTagsUseCase(tagRepository)
  const controller = new ListTagsController(useCase)
  return controller
}
