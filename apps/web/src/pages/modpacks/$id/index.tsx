import { z } from '@org/validation/zod'
import { createFileRoute } from '@tanstack/react-router'
import { modpackKeys } from '@/hooks/modpack/modpack-keys'
import { queryClient } from '@/lib/react-query'
import { ModpackService } from '@/services/modpack'
import { MyModpacksPages } from './-components/my-modpacks-page'

const modsSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1).default(1),
  limit: z.coerce.number().int().positive().max(100).catch(33).default(33),
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'])
    .catch('createdAt')
    .default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).catch('asc').default('desc'),
})

export type ModsFiltersSchema = z.infer<typeof modsSearchSchema>

export const Route = createFileRoute('/modpacks/$id/')({
  validateSearch: modsSearchSchema,
  loader: async ({ params: { id } }) => {
    try {
      return await queryClient.ensureQueryData({
        queryKey: [...modpackKeys.get(id), 'public'],
        queryFn: () => ModpackService.getPublic(id),
      })
    } catch {
      return null
    }
  },
  component: MyModpacksPages,
  head: ({ loaderData }) => {
    const modpack = loaderData
    const title = modpack ? `${modpack.name} | PZ Packs` : 'Modpack | PZ Packs'
    const description = modpack?.description || 'View this modpack on PZ Packs'
    const image = modpack?.avatarUrl || '/brand/pz-packs-logo.svg'

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'theme-color', content: '#4ade80' },
      ],
    }
  },
})
