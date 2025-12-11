import { env } from '@/env'
import { headers } from '@/services/helpers'
import type { IMemberDTO } from '../dtos'

export async function getModpackMembersService(modpackId: string) {
  const url = `${env.VITE_API_URL}/modpacks/${modpackId}/members`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...headers },
  })

  if (res.status !== 200) {
    const { error } = await res.json()
    throw new Error(error.message ?? 'We have a problem listing the members')
  }

  return (await res.json()) as IMemberDTO[]
}
