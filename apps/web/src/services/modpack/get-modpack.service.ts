import type { DModpack } from '@org/database/schemas'
import { env } from '@/env'
import { failure, headers, success } from '../helpers'
import type { IModpackDTO } from './dtos'

export async function getModpackService(id: string) {
  const url = `${env.VITE_API_URL}/modpacks/${id}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...headers },
  })

  console.log(await res.json())

  if (res.status !== 200) {
    const { error } = await res.json()
    throw new Error(error.message ?? 'We have a problem listing the modpacks')
  }

  return (await res.json()) as IModpackDTO
}
