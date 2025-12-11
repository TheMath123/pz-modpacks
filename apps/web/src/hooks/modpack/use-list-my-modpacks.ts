import type { DModpack } from '@org/database/schemas'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import type { PaginatedResponse, PaginateQueryParams } from '@/services/dtos'
import { ModpackService } from '@/services/modpack'
import { modpackKeys } from './modpack-keys'
import { usePaginatedModpacks } from './use-paginated-modpacks'

export function useListMyModpacks(
  queryParams: PaginateQueryParams = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<DModpack>>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<PaginatedResponse<DModpack>> {
  return usePaginatedModpacks({
    queryParams,
    queryKey: modpackKeys.myList(queryParams),
    queryFn: ModpackService.listMyModpacks,
    options,
  })
}
