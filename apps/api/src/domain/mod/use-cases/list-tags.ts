import type { TagRepository } from '@org/database/repository/tag-repository'

export class ListTagsUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute() {
    return await this.tagRepository.findAll()
  }
}
