import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type {
  ErrorResponse,
  PaginatedResponse,
  PaginateQueryParams,
} from '@/services/dtos'

interface UsePaginatedOptions<T> {
  queryParams?: PaginateQueryParams
  queryKey: readonly unknown[]
  queryFn: (
    queryParams: PaginateQueryParams,
  ) => Promise<PaginatedResponse<T>> | Promise<ErrorResponse>
  options?: Omit<UseQueryOptions<PaginatedResponse<T>>, 'queryKey' | 'queryFn'>
}

export function usePaginated<T>({
  queryParams = {},
  queryKey,
  queryFn,
  options,
}: UsePaginatedOptions<T>): UseQueryResult<PaginatedResponse<T>> {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn(queryParams)
      if ('data' in response) {
        return response
      }
      throw response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  })
}
