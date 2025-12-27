import { env } from '@/env'
import { headers } from '../helpers'

export interface ITagDTO {
  id: string
  name: string
}

export async function listTagsService() {
  const url = `${env.VITE_API_URL}/mods/tags`

  const res = await fetch(url, {
    method: 'GET',
    headers: { ...headers },
  })

  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.error?.message ?? 'We have a problem listing the tags')
  }

  return data as ITagDTO[]
}
