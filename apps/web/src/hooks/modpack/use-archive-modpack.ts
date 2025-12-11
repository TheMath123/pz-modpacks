import { toast } from '@org/design-system/components/ui/sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ModpackService } from '@/services/modpack'
import { modpackKeys } from './modpack-keys'

interface ArchiveModpackParams {
  modpackId: string
}

export function useArchiveModpack() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ modpackId }: ArchiveModpackParams) =>
      ModpackService.archive(modpackId),
    onSuccess: (_, variables) => {
      toast.success('Modpack archived successfully')

      queryClient.invalidateQueries({
        queryKey: modpackKeys.get(variables.modpackId),
      })
      queryClient.invalidateQueries({ queryKey: modpackKeys.all })
    },
    onError: (error) => {
      toast.error(
        (error as Error).message ||
          'Failed to archive modpack. Please try again later.',
      )
    },
  })
}
