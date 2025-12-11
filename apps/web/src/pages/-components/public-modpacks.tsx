import { ModpackFilters } from '@/components/modpack/filters/modpack-filters'
import { ModpackGrid } from '@/components/modpack/modpack-grid'
import { PaginationControls } from '@/components/pagination'
import { useFilters, useListPublicModpacks } from '@/hooks'
import type { PublicModpacksFiltersSchema } from '..'

export function PublicModpacks() {
  const { filters, handleSearchChange, handleSortChange, handlePageChange } =
    useFilters<PublicModpacksFiltersSchema>()

  const { data, isLoading, error } = useListPublicModpacks(filters)

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
