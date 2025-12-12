import { z } from '@org/validation'

export const listModsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type ListModsQuerySchema = z.infer<typeof listModsQuerySchema>
