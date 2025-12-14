import type { ConnectionOptions } from 'bullmq'
import { env } from '@/env'

const url = new URL(env.SECONDARY_DATABASE_URL)

export const connection: ConnectionOptions = {
  host: url.hostname,
  port: Number(url.port),
  username: url.username,
  password: url.password,
}
