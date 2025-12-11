import { SealCheckIcon } from '@org/design-system/components/ui/icons'
import { cn } from '@org/design-system/lib/utils'

export function ModpackVerifiedBadge({ className }: { className?: string }) {
  const msg = 'This modpack is verified by the PZ Packs team.'
  return (
    <div
      className={cn(
        'group relative flex items-center justify-center rounded-full',
        className,
      )}
    >
      <SealCheckIcon
        className="w-5 h-5 text-primary group-hover:text-primary-hover group-hover:scale-110 transition-all duration-200 ease-in-out"
        weight="bold"
      />
      <div className="absolute flex flex-col items-start gap-1 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border-2 border-border z-50">
        <span className="text-foreground text-base font-medium">{msg}</span>
      </div>
    </div>
  )
}
