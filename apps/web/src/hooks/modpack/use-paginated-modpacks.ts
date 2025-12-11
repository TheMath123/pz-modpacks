import type { DModpack } from '@org/database/schemas'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { PaginatedResponse, PaginateQueryParams } from '@/services/dtos'

interface UsePaginatedModpacksOptions {
  queryParams?: PaginateQueryParams
  queryKey: readonly unknown[]
  queryFn: (queryParams: PaginateQueryParams) => Promise<{
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
  queryParams = {},
  queryKey,
  queryFn,
  options,
}: UsePaginatedModpacksOptions): UseQueryResult<PaginatedResponse<DModpack>> {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await queryFn(queryParams)
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
