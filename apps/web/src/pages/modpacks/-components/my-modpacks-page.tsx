import { ErrorCard } from '@/components/error-card'
import { ModpackFilters } from '@/components/modpack/filters/modpack-filters'
import { ModpackGrid } from '@/components/modpack/modpack-grid'
import { PaginationControls } from '@/components/pagination'
import { useFilters, useListMyModpacks } from '@/hooks'
import { CreateModpackDialog } from '@/pages/modpacks/-components/create-modpack-dialog'
import type { ModpacksFiltersSchema } from '..'

export function MyModpacksPage() {
  const { filters, handleSearchChange, handleSortChange, handlePageChange } =
    useFilters<ModpacksFiltersSchema>()

  const { data, isLoading, error } = useListMyModpacks(filters)

  return (
    <div className="container flex flex-col gap-8 p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Modpacks</h1>
          <p className="text-muted-foreground">
            Manage your modpacks and collaborate with others
          </p>
        </div>
        <CreateModpackDialog />
      </div>

      {error ? (
        <ErrorCard message={error.message} />
      ) : (
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
            emptyMessage="You don't have any modpacks yet. Create one to get started!"
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
      )}
    </div>
  )
}
