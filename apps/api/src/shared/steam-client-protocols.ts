export interface SteamWorkshopFileDetails {
  publishedfileid: string
  result: number
  creator: string
  creator_app_id: number
  consumer_app_id: number
  filename: string
  file_size: number
  file_url: string
  hcontent_file: string
  preview_url: string
  hcontent_preview: string
  title: string
  description: string
  time_created: number
  time_updated: number
  visibility: number
  banned: number
  ban_reason: string
  subscriptions: number
  favorited: number
  lifetime_subscriptions: number
  lifetime_favorited: number
  views: number
  tags: { tag: string }[]
}

export interface ScrapedModInfo {
  workshop_id: number | null
  mod_id: string[] | null
  map_folder: string[] | null
  title: string
  description?: string
  imageURL?: string
  modsRequirements: { name: string; id: string | null; url: string }[]
  error?: string | null
  rawDescription?: string
}

export interface WorkshopInfo {
  workshop_id: number | null
  mod_id: string[] | null
  map_folder: string[] | null
}
