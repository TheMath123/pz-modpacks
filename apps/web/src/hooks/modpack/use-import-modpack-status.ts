import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { ModpackImportService } from '@/services/modpack/import'
import { modpackModsKeys } from './mod/modpack-mods-keys'

export function useImportModpackStatus(modpackId: string) {
  const queryClient = useQueryClient()
  const prevStatusRef = useRef<string | undefined>(undefined)

  const query = useQuery({
    queryKey: ['import-modpack-status', modpackId],
    queryFn: () => ModpackImportService.getImportStatus(modpackId),
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status === 'active' || status === 'waiting' || status === 'delayed') {
        return 2000 // Poll every 2 seconds
      }
      return false // Stop polling
    },
  })

  const status = query.data?.status

  useEffect(() => {
    if (status === 'completed' && prevStatusRef.current !== 'completed') {
      queryClient.invalidateQueries({
        queryKey: modpackModsKeys.list(modpackId, {}).slice(0, 3),
      })
    }
    prevStatusRef.current = status
  }, [status, modpackId, queryClient])

  return query
}
