import { authClient } from '@/lib/auth'

export function useCanManageModpack(ownerId: string) {
  const { data: session } = authClient.useSession()

  if (!session?.user?.id) {
    return false
  }

  return session.user.id === ownerId
}
