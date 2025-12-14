import { modpackModRepository } from '@org/database'
import { upsertModFromSteamService } from '@/domain/mod/services/upsert-mod-from-steam'

export class AddModToModpackService {
  async execute(
    workshopId: string,
    modpackId: string,
    processedWorkshopIds: Set<string> = new Set(),
    addedMods: string[] = [],
  ): Promise<void> {
    if (processedWorkshopIds.has(workshopId)) return
    processedWorkshopIds.add(workshopId)

    const mod = await upsertModFromSteamService.execute(workshopId)

    if (!mod) return

    // Add to modpack if not exists
    const existingModpackMod = await modpackModRepository.findMod(
      modpackId,
      mod.id,
    )

    if (existingModpackMod) {
      if (!existingModpackMod.isActive) {
        await modpackModRepository.reactivateMod(modpackId, mod.id)
        addedMods.push(mod.name)
      }
    } else {
      await modpackModRepository.addMod({ modpackId, modId: mod.id })
      addedMods.push(mod.name)
    }

    // Process requirements
    if (mod.requiredMods && mod.requiredMods.length > 0) {
      for (const reqWorkshopId of mod.requiredMods) {
        if (reqWorkshopId) {
          await this.execute(
            reqWorkshopId,
            modpackId,
            processedWorkshopIds,
            addedMods,
          )
        }
      }
    }
  }
}

export const addModToModpackService = new AddModToModpackService()
