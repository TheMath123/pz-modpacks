import type { DModpack } from '@org/database/schemas'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ModpackFilters } from '@/services/modpack/get-public-modpacks.service'
import type { PaginatedResponse } from '@/services/types'

interface UsePaginatedModpacksOptions {
  filters?: ModpackFilters
  queryKey: readonly unknown[]
  queryFn: (filters: ModpackFilters) => Promise<{
    success: boolean
    data?: PaginatedResponse<DModpack>
    error?: string
  }>
  options?: Omit<
    UseQueryOptions<PaginatedResponse<DModpack>>,
    'queryKey' | 'queryFn'
  >
}

export function usePaginatedModpacks({
  filters = {},
  queryKey,
  queryFn,
  options,
}: UsePaginatedModpacksOptions): UseQueryResult<PaginatedResponse<DModpack>> {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await queryFn(filters)
      if (!result.success) {
        return {
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        } as PaginatedResponse<DModpack>
      }
      return result.data as PaginatedResponse<DModpack>
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  })
}
