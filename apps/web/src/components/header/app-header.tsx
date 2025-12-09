import { Link } from '@tanstack/react-router'
import { Anchor } from '../anchor'
import { NavUser } from './nav-user'

export function AppHeader() {
  return (
    <header className="container flex justify-between items-center my-4">
      <Link
        to="/"
        className="hover:scale-95 active:scale-110 transition-all duration-200 ease-in-out flex flex-row gap-2 items-center"
      >
        <img src="/favicon.svg" alt="PZ Packs" className="h-16" />
        <h1 className="font-bold text-2xl">PZ Packs</h1>
      </Link>
      <nav className="flex flex-row gap-3 items-center">
        <Anchor href="/">Home</Anchor>
        <Anchor href="/modpacks">My Modpacks</Anchor>
        <NavUser />
      </nav>
    </header>
  )
}
