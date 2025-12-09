import { UserPlusIcon } from '@org/design-system/components/ui/icons'
import { cn } from '@org/design-system/lib/utils'

export function AddMemberButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'group relative inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-dashed border-border ml-2 cursor-pointer hover:border-2 hover:border-border hover:border-solid active:scale-95 hover:shadow transition-all',
        className,
      )}
      title="Add member"
      {...props}
    >
      <UserPlusIcon
        className="h-4 w-4 text-muted-foreground group-hover:text-white"
        weight="bold"
      />
    </button>
  )
}
