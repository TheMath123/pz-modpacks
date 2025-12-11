import { z } from '@org/validation'
import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from './-components/home-page'

const publicModpacksSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1).default(1),
  limit: z.coerce.number().int().positive().max(100).catch(12).default(12),
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'])
    .catch('createdAt')
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).catch('desc').default('desc'),
})

export type PublicModpacksFiltersSchema = z.infer<
  typeof publicModpacksSearchSchema
>

export const Route = createFileRoute('/')({
  validateSearch: publicModpacksSearchSchema,
  component: RouteComponent,
  head: async () => ({
    meta: [
      { title: 'PZ Packs' },
      {
        name: 'description',
        content:
          'Project Zomboid modpack platform. Discover, create, and share modpacks with ease!',
      },
    ],
  }),
})

function RouteComponent() {
  return <HomePage />
}
