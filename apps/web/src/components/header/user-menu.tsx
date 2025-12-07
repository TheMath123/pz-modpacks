import { Button } from '@org/design-system/components/ui/button'
import { SignOutIcon } from '@org/design-system/components/ui/icons'
import { auth } from '@/lib/auth'

export function UserMenu() {
  const { isPending, data } = auth.useSession()
  if (isPending) return null

  if (!data) {
    return (
      <Button
        onClick={() =>
          auth.signIn.social({
            provider: 'discord',
            callbackURL: location.origin,
          })
        }
      >
        Login With Discord
      </Button>
    )
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        src={data.user.image ?? ''}
        alt={data.user.name ?? undefined}
        className="rounded-radius w-8 h-8 border-2 border-border shadow"
      />
      <span className="font-medium">{data.user.name}</span>
      <Button onClick={() => auth.signOut()}>
        <SignOutIcon />
        Logout
      </Button>
    </div>
  )
}
