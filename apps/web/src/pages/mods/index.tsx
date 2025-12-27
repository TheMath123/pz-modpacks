import { z } from '@org/validation/zod'
import { createFileRoute } from '@tanstack/react-router'
import { ModsPage } from './-components/mods-page'

const modsSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1).default(1),
  limit: z.coerce.number().int().positive().max(100).catch(33).default(33),
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'])
    .catch('createdAt')
    .default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).catch('asc').default('desc'),
  tags: z.string().optional().catch(undefined),
})

export type ModsFiltersSchema = z.infer<typeof modsSearchSchema>

export const Route = createFileRoute('/mods/')({
  validateSearch: modsSearchSchema,
  component: ModsPage,
})
