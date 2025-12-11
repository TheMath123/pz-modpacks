import { toast } from '@org/design-system/components/ui/sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MembersService } from '@/services/modpack/members'
import { modpackKeys } from '../modpack/modpack-keys'

interface RemoveMemberParams {
  modpackId: string
  email: string
}

export function useRemoveModpackMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ modpackId, email }: RemoveMemberParams) =>
      MembersService.remove(modpackId, email),
    onSuccess: (_, variables) => {
      toast.success('Member removed successfully')
      queryClient.invalidateQueries({
        queryKey: modpackKeys.members(variables.modpackId),
      })
      queryClient.invalidateQueries({
        queryKey: modpackKeys.detail(variables.modpackId),
      })
    },
    onError: (error) => {
      toast.error(
        (error as Error).message ||
          'Failed to remove member. Please try again later.',
      )
    },
  })
}
