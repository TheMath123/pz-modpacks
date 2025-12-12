import * as cheerio from 'cheerio'
import { env } from '@/env'
import type {
  ScrapedModInfo,
  SteamWorkshopFileDetails,
  WorkshopInfo,
} from './steam-client-protocols'

export class SteamClient {
  private apiKey: string
  private appId: string

  constructor(apiKey: string, appId = '108600') {
    this.apiKey = apiKey
    this.appId = appId
  }

  async querySteamWorkshopFiles(
    workshopId: string,
  ): Promise<SteamWorkshopFileDetails | null> {
    const url = `https://api.steampowered.com/IPublishedFileService/GetDetails/v1/?key=${this.apiKey}&query_type=0&cursor=*&appid=${this.appId}&return_previews=true&return_details=true&publishedfileids[0]=${encodeURIComponent(workshopId)}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(
          `Erro HTTP: ${response.status} - ${response.statusText}`,
        )
      }
      const data = await response.json()
      const details = data.response?.publishedfiledetails?.[0]

      if (!details || details.result !== 1) {
        return null
      }

      return details
    } catch (error) {
      console.error('Erro na consulta Steam API:', error)
      throw error
    }
  }

  async scrapeWorkshopPage(workshopId: string): Promise<ScrapedModInfo> {
    const workshopUrl = `https://steamcommunity.com/sharedfiles/filedetails/?id=${workshopId}`

    try {
      const response = await fetch(workshopUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to fetch workshop page: ${response.status} ${response.statusText}`,
        )
      }

      const html = await response.text()
      const $ = cheerio.load(html)

      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text().replace('Steam Workshop::', '')

      if (title === 'Steam Community :: Error') {
        return {
          workshop_id: parseInt(workshopId),
          mod_id: null,
          map_folder: null,
          title: 'Error',
          modsRequirements: [],
          error: 'Mod not found',
        }
      }

      const modsRequirements: {
        name: string
        id: string | null
        url: string
      }[] = []

      const metaDescription =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content')
      const image = $('meta[property="og:image"]').attr('content')
      const rawDescription = $('#highlightContent').html() || ''

      $('.requiredItemsContainer a').each((_, element) => {
        const url = $(element).attr('href')
        const name = $(element).find('.requiredItem').text().trim()
        if (url) {
          const urlParams = new URL(url)
          const id = urlParams.searchParams.get('id')
          modsRequirements.push({ name, id, url })
        }
      })

      const modInfo = this.findInfo(rawDescription)

      return {
        title: title.replace('Steam Workshop::', ''),
        description: metaDescription,
        rawDescription: rawDescription,
        imageURL: image,
        modsRequirements: modsRequirements,
        ...modInfo,
        error: null,
      }
    } catch (error) {
      console.error('Error scraping workshop page:', error)
      throw error
    }
  }

  private findInfo(contentText: string | null): WorkshopInfo {
    if (!contentText) {
      return { workshop_id: null, mod_id: null, map_folder: null }
    }

    // Remove HTML tags for regex matching
    const cleanText = contentText.replace(/<[^>]*>?/gm, '\n')

    const workshopIdMatch = cleanText.match(/Workshop ID:\s*(\d+)/i)

    const modIdSet = new Set<string>()
    // Improved regex to capture Mod ID more reliably
    const modIdMatches = cleanText.matchAll(/Mod ID:\s*([^\s\n<]+)/gi)
    for (const match of modIdMatches) {
      if (match[1]) {
        modIdSet.add(match[1].trim())
      }
    }

    const mapFolderMatches = [
      ...cleanText.matchAll(/Map Folder:\s*([^\s\n<]+)/gi),
    ].map((m) => m[1].trim())

    return {
      workshop_id: workshopIdMatch ? parseInt(workshopIdMatch[1], 10) : null,
      mod_id: modIdSet.size > 0 ? Array.from(modIdSet) : null,
      map_folder: mapFolderMatches.length > 0 ? mapFolderMatches : null,
    }
  }
}

export const steamClient = new SteamClient(env.STEAM_API_KEY)
