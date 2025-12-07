import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'

export function AppHeader() {
  return (
    <header className="container flex justify-end items-center my-4">
      <nav className="flex flex-row gap-3 items-center">
        <ThemeToggle />
        <UserMenu />
      </nav>
    </header>
  )
}
