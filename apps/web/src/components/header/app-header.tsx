import { cn } from '@org/design-system/lib/utils'
import { useTheme } from '@org/design-system/providers'
import { Link, useLocation } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { Anchor } from '../anchor'
import { NavUser } from './nav-user'

export function AppHeader() {
  const { theme } = useTheme()
  const { data: session } = auth.useSession()
  const { pathname } = useLocation()

  return (
    <header className="py-2 border-b-2">
      <div className="container flex justify-between items-center gap-2">
        <Link
          to="/"
          className="hover:scale-95 active:scale-110 transition-all duration-200 ease-in-out flex flex-row gap-2 items-center"
        >
          <img
            src={
              theme === 'dark'
                ? '/brand/pz-packs-logo-dark.svg'
                : '/brand/pz-packs-logo.svg'
            }
            alt="PZ Packs"
            className="h-16"
          />
          <h1 className="font-bold text-2xl hidden md:block">PZ Packs</h1>
        </Link>
        <div className="flex flex-row gap-2 items-center flex-wrap">
          <Anchor href="/" className={cn(pathname === '/' && 'underline ')}>
            Home
          </Anchor>
          {session ? (
            <Anchor
              href="/modpacks"
              className={cn(pathname === '/modpacks' && 'underline ')}
            >
              My Modpacks
            </Anchor>
          ) : null}
        </div>
        <NavUser />
      </div>
    </header>
  )
}
