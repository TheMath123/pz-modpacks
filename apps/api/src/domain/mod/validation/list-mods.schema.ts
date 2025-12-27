import { z } from '@org/validation'

export const listModsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  tags: z.string().optional(),
})

export type ListModsQuerySchema = z.infer<typeof listModsQuerySchema>
