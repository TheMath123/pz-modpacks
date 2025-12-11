import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import type { PaginatedResponse, PaginateQueryParams } from '@/services/dtos'
import { ModpackService } from '@/services/modpack'
import type { IModpackDTO } from '@/services/modpack/dtos'
import { modpackKeys } from './modpack-keys'
import { usePaginatedModpacks } from './use-paginated-modpacks'

export function useListPublicModpacks(
  queryParams: PaginateQueryParams = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<IModpackDTO>>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<PaginatedResponse<IModpackDTO>> {
  return usePaginatedModpacks({
    queryParams
    queryKey: modpackKeys.publicList(queryParams),
    queryFn:async ()=> awaitModpackService.listPublicModpacks(queryParams),
    options,
  })
}
