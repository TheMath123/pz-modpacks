import type { DModpack } from '@org/database/schemas'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { ModpackService } from '@/services/modpack'
import type { ModpackFilters } from '@/services/modpack/get-public-modpacks.service'
import type { PaginatedResponse } from '@/services/types'
import { modpackKeys } from './modpack-keys'
import { usePaginatedModpacks } from './use-paginated-modpacks'

export function useMyModpacks(
  filters: ModpackFilters = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<DModpack>>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<PaginatedResponse<DModpack>> {
  return usePaginatedModpacks({
    filters,
    queryKey: modpackKeys.myList(filters),
    queryFn: ModpackService.getMyModpacks,
    options,
  })
}
