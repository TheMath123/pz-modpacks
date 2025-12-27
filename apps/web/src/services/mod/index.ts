import { getModService } from './get-mod.service'
import { getModByWorkshopIdService } from './get-mod-by-workshop.service'
import { listModsService } from './list-mods.service'
import { listTagsService } from './list-tags.service'

export const ModService = {
  get: getModService,
  getModByWorkshopId: getModByWorkshopIdService,
  list: listModsService,
  listTags: listTagsService,
}
