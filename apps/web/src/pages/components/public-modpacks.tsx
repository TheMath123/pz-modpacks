import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'
import { ModpackFilters } from '@/components/modpack/filters/modpack-filters'
import { ModpackGrid } from '@/components/modpack/modpack-grid'
import { PaginationControls } from '@/components/pagination'
import { usePublicModpacks } from '@/hooks/modpack'

interface PublicModpacksSearchParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'name'
  sortOrder?: 'asc' | 'desc'
}

export function PublicModpacks() {
  const navigate = useNavigate()
  const searchParams = useSearch({
    strict: false,
  }) as PublicModpacksSearchParams

  const filters = {
    page: String(searchParams.page ?? 1),
    limit: String(searchParams.limit ?? 12),
    search: searchParams.search,
    sortBy: searchParams.sortBy ?? 'createdAt',
    sortOrder: searchParams.sortOrder ?? 'desc',
  }

  const { data, isLoading, error } = usePublicModpacks(filters)

  const updateURL = useCallback(
    (updates: Partial<PublicModpacksSearchParams>) => {
      navigate({
        search: (prev) => ({ ...prev, ...updates }),
      })
    },
    [navigate],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page })
    },
    [updateURL],
  )

  const handleSearchChange = useCallback(
    (search: string) => {
      updateURL({ search: search || undefined, page: 1 })
    },
    [updateURL],
  )

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: string) => {
      updateURL({
        sortBy: sortBy as PublicModpacksSearchParams['sortBy'],
        sortOrder: sortOrder as PublicModpacksSearchParams['sortOrder'],
        page: 1,
      })
    },
    [updateURL],
  )

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          Error loading modpacks: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ModpackFilters
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        initialSearch={filters.search}
        initialSortBy={filters.sortBy}
        initialSortOrder={filters.sortOrder}
      />

      <ModpackGrid
        modpacks={data?.data ?? []}
        isLoading={isLoading}
        emptyMessage="No modpacks found =("
      />

      {data && data.pagination.totalPages > 1 && (
        <PaginationControls
          currentPage={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
