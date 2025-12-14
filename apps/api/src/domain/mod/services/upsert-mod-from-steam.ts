import { modRepository, tagRepository } from '@org/database'
import { steamClient } from '@/shared/steam-client'

export class UpsertModFromSteamService {
  async execute(workshopId: string) {
    // Check if mod exists in DB
    let mod = await modRepository.findByWorkshopId(workshopId)

    if (mod) {
      return mod
    }

    // Fetch from Steam
    const steamDetails = await steamClient.querySteamWorkshopFiles(workshopId)
    const scrapedInfo = await steamClient.scrapeWorkshopPage(workshopId)

    if (!steamDetails && !scrapedInfo.title) {
      console.warn(`Mod ${workshopId} not found on Steam`)
      return null
    }

    if (steamDetails && steamDetails.file_type !== 0) {
      throw new Error(`Workshop item ${workshopId} not a mod.`)
    }

    if (scrapedInfo.isCollection) {
      throw new Error(`Workshop item ${workshopId} not a mod.`)
    }

    const title = steamDetails?.title || scrapedInfo.title || 'Unknown Mod'
    const description =
      steamDetails?.file_description ||
      scrapedInfo.description ||
      scrapedInfo.rawDescription?.replace(/<[^>]*>?/gm, '')
    const image = steamDetails?.preview_url || scrapedInfo.imageURL

    // Handle Tags
    const tagIds: string[] = []
    if (steamDetails?.tags) {
      for (const tagObj of steamDetails.tags) {
        const tag = await tagRepository.findOrCreate(tagObj.tag)
        tagIds.push(tag.id)
      }
    }

    // Handle Highlights
    const highlights: string[] = []
    if (steamDetails?.previews) {
      highlights.push(
        ...steamDetails.previews
          .filter((p) => p.preview_type === 0)
          .map((p) => p.url),
      )
    }

    // Handle modId (can be multiple)
    const modIds = scrapedInfo.mod_id || ['unknown']

    // Create mod
    mod = await modRepository.create({
      name: title,
      steamModId: modIds,
      workshopId: workshopId,
      mapFolders: scrapedInfo.map_folder || [],
      requiredMods: scrapedInfo.modsRequirements
        .map((r) => r.id)
        .filter((id): id is string => !!id),
      description: description,
      steamUrl: `https://steamcommunity.com/sharedfiles/filedetails/?id=${workshopId}`,
      avatarUrl: image,
      highlights: highlights,
      tags: tagIds,
    })

    return mod
  }
}

export const upsertModFromSteamService = new UpsertModFromSteamService()
