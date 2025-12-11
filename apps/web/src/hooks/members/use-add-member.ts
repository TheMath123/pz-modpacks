import { toast } from '@org/design-system/components/ui/sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MembersService } from '@/services/modpack/members'
import { modpackKeys } from '../modpack/modpack-keys'

interface AddMemberParams {
  modpackId: string
  email: string
}

export function useAddModpackMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ modpackId, email }: AddMemberParams) =>
      MembersService.add(modpackId, email),
    onSuccess: (_, variables) => {
      toast.success('Member added successfully')
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
          'Failed to add member. Please try again later.',
      )
    },
  })
}
