import { ErrorCard } from '@/components/error-card'
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
    return <ErrorCard message={error.message} />
  }

  return (
    <div className="space-y-6">
      <ModpackFilters
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        search={filters.search}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
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
