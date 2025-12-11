import { z } from '@org/validation/zod'
import { createFileRoute } from '@tanstack/react-router'
import { MyModpacksPage } from './-components/my-modpacks-page'

const modpacksSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1).default(1),
  limit: z.coerce.number().int().positive().max(100).catch(12).default(12),
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'])
    .catch('createdAt')
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).catch('desc').default('desc'),
})

export type ModpacksFiltersSchema = z.infer<typeof modpacksSearchSchema>

export const Route = createFileRoute('/modpacks/')({
  validateSearch: modpacksSearchSchema,
  component: MyModpacksPage,
})
