import type { ModpackFilters } from '@/services/modpack/get-public-modpacks.service'

export const modpackKeys = {
  all: ['modpacks'] as const,
  lists: () => [...modpackKeys.all, 'list'] as const,
  list: (filters: ModpackFilters) => [...modpackKeys.lists(), filters] as const,
  publicLists: () => [...modpackKeys.all, 'public'] as const,
  publicList: (filters: ModpackFilters) =>
    [...modpackKeys.publicLists(), filters] as const,
  myLists: () => [...modpackKeys.all, 'my'] as const,
  myList: (filters: ModpackFilters) =>
    [...modpackKeys.myLists(), filters] as const,
  details: () => [...modpackKeys.all, 'detail'] as const,
  detail: (id: string) => [...modpackKeys.details(), id] as const,
}
