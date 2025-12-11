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
  const filters = useSearch()

  const setFilters = useCallback(
    (newFilters: Partial<T>) => {
      navigate({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        search: (prev: any) => ({
          ...prev,
          ...newFilters,
        }),
      })
    },
    [navigate],
  )

  const handleSearchChange = useCallback(
    (search: string) => {
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
