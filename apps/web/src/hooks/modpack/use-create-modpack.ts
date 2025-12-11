import { toast } from '@org/design-system/components/ui/sonner'
import type { CreateModpackFormData } from '@org/validation/forms/modpack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ModpackService } from '@/services/modpack'
import { modpackKeys } from './modpack-keys'

type CreateModpackParams = CreateModpackFormData
export function useCreateModpack() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateModpackParams) => ModpackService.create(data),
    onSuccess: () => {
      toast.success('Modpack updated successfully')
      queryClient.invalidateQueries({ queryKey: modpackKeys.myLists() })
    },
    onError: (error) => {
      toast.error(
        (error as Error).message ||
          'Failed to update modpack. Please try again later.',
      )
    },
  })
}
