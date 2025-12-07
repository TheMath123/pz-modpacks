import { Button } from '@org/design-system/components/ui/button'
import { MoonIcon, SunIcon } from '@org/design-system/components/ui/icons'
import { useTheme } from '@org/design-system/providers'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme Mode"
      title="Toggle Theme Mode"
    >
      {theme === 'light' ? (
        <MoonIcon className="size-4.5" weight="bold" />
      ) : (
        <SunIcon className="size-4.5" weight="bold" />
      )}
    </Button>
  )
}
