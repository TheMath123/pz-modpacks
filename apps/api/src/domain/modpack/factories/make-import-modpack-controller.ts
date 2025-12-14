import { modpackMemberRepository, modpackRepository } from '@org/database'
import { ImportModpackController } from '../controllers/import-modpack.controller'

export function makeImportModpackController() {
  const controller = new ImportModpackController(
    modpackRepository,
    modpackMemberRepository,
  )
  return controller
}
