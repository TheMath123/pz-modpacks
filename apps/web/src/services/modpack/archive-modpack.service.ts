import { env } from '@/env'
import type { ArchiveSuccess } from '../dtos'
import { headers } from '../helpers'

export async function archiveModpackService(id: string) {
  const url = `${env.VITE_API_URL}/modpacks/${id}`

  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: { ...headers },
  })

  if (res.status !== 200) {
    const { error } = await res.json()
    throw new Error(error.message ?? 'We have a problem archiving this modpack')
  }
  return (await res.json()) as ArchiveSuccess
}
