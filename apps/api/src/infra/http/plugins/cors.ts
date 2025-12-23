import { cors } from '@elysiajs/cors'
import Elysia from 'elysia'
import { env } from '@/env'

console.log('CORS origin allowed:', env.ORIGIN_ALLOWED)
export const corsPlugin = new Elysia().use(
  cors({
    origin: env.ORIGIN_ALLOWED,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
