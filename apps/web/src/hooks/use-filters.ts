import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

export interface PaginationFilters {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export function useFilters<T extends PaginationFilters>() {
  const navigate = useNavigate()
  // biome-ignore lint/suspicious/noExplicitAny: problem with tanstack types
  const filters = useSearch({ strict: false } as any) as T

  const setFilters = useCallback(
    (newFilters: Partial<T>) => {
      navigate({
        // biome-ignore lint/suspicious/noExplicitAny: problem with tanstack types
        search: ((prev: any) => ({
          ...prev,
          ...newFilters,
          // biome-ignore lint/suspicious/noExplicitAny: problem with tanstack types
        })) as any,
      })
    },
    [navigate],
  )

  const handleSearchChange = useCallback(
    (search: string | undefined) => {
      setFilters({ search, page: 1 } as Partial<T>)
    },
    [setFilters],
  )

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: string) => {
      setFilters({
        sortBy,
        sortOrder,
      } as Partial<T>)
    },
    [setFilters],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page } as Partial<T>)
    },
    [setFilters],
  )

  return {
    filters,
    setFilters,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
  }
}
