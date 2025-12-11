import type { PaginateQueryParams } from '@/services/dtos'

export const modpackKeys = {
  all: ['modpacks'] as const,
  lists: () => [...modpackKeys.all, 'list'] as const,
  list: (queryParams: PaginateQueryParams) =>
    [...modpackKeys.lists(), queryParams] as const,
  publicLists: () => [...modpackKeys.all, 'public'] as const,
  publicList: (queryParams: PaginateQueryParams) =>
    [...modpackKeys.publicLists(), queryParams] as const,
  myLists: () => [...modpackKeys.all, 'my'] as const,
  myList: (queryParams: PaginateQueryParams) =>
    [...modpackKeys.myLists(), queryParams] as const,
  details: () => [...modpackKeys.all, 'detail'] as const,
  detail: (id: string) => [...modpackKeys.details(), id] as const,
  membersLists: () => [...modpackKeys.all, 'members'] as const,
  members: (modpackId: string) =>
    [...modpackKeys.membersLists(), modpackId] as const,
}
