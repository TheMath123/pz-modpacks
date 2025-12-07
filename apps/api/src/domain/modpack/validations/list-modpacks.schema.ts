import { z } from '@org/validation/zod'

export const listModpacksQuerySchema = z.object({
  page: z.coerce
    .number({ error: 'Invalid page number' })
    .int({ error: 'Page must be an integer' })
    .positive({ error: 'Page must be a positive number' })
    .default(1),
  limit: z.coerce
    .number({ error: 'Invalid limit number' })
    .int({ error: 'Limit must be an integer' })
    .positive({ error: 'Limit must be a positive number' })
    .max(100, { error: 'Limit cannot exceed 100' })
    .default(10),
  search: z.string({ error: 'Invalid search query' }).optional(),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'], { error: 'Invalid sortBy value' })
    .default('createdAt'),
  sortOrder: z
    .enum(['asc', 'desc'], { error: 'Invalid sortOrder value' })
    .default('desc'),
})

export type ListModpacksQuerySchema = z.infer<typeof listModpacksQuerySchema>
