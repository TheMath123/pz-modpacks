import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { IMemberDTO } from '@/services/modpack/dtos'
import { MembersService } from '@/services/modpack/members'
import { modpackKeys } from '../modpack/modpack-keys'

export function useMembers(
  modpackId: string,
  options?: Omit<UseQueryOptions<IMemberDTO[]>, 'queryKey' | 'queryFn'>,
): UseQueryResult<IMemberDTO[]> {
  return useQuery({
    queryKey: modpackKeys.members(modpackId),
    queryFn: async () => await MembersService.get(modpackId),
    enabled: !!modpackId,
    ...options,
  })
}
