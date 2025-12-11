export interface PaginateQueryParams {
  page?: string
  limit?: string
  search?: string
  sortBy?: string
  sortOrder?: string
  [key: string]: unknown
}
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ArchiveSuccess {
  message: string
}
