import {
  modpackModRepository,
  modRepository,
  tagRepository,
} from '@org/database'
import { UpsertModFromSteamUseCase } from '@/domain/mod/use-cases/upsert-mod-from-steam'
import { steamClient } from '@/shared/steam-client'
import { AddModToModpackUseCase } from '../use-cases/add-mod-to-modpack'
import { ImportModpackUseCase } from '../use-cases/import-modpack-use-case'

export function makeImportModpackUseCase() {
  const upsertModFromSteamUseCase = new UpsertModFromSteamUseCase(
    modRepository,
    tagRepository,
    steamClient,
  )
  const addModToModpackUseCase = new AddModToModpackUseCase(
    modpackModRepository,
    upsertModFromSteamUseCase,
  )
  return new ImportModpackUseCase(addModToModpackUseCase)
}
