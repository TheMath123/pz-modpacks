export interface PaginateQueryParams {
  page?: string | number
  limit?: string | number
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

export interface ErrorResponse {
  error: { message: string }
}

export interface ArchiveSuccess {
  message: string
}
