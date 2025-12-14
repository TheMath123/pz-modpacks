import { eq } from 'drizzle-orm'
import { database } from '..'
import { tags } from '../schemas/tags'

export const tagRepository = {
  async findByName(name: string) {
    const result = await database.select().from(tags).where(eq(tags.name, name))
    return result[0] || null
  },

  async create(name: string) {
    const result = await database.insert(tags).values({ name }).returning()
    return result[0]
  },

  async findOrCreate(name: string) {
    const existing = await this.findByName(name)
    if (existing) {
      return existing
    }
    return this.create(name)
  },
}
