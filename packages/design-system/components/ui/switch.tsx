import { Switch as SwitchPrimitive } from '@base-ui-components/react/switch'
import { cn } from '@org/design-system/lib/utils'

function Switch({ className, children, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-checked:bg-primary data-unchecked:bg-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-unchecked:bg-background/80 inline-flex h-6 w-10 shrink-0 items-center rounded-md border-2 border-border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Root>
  )
}

function SwitchThumb({ className, ...props }: SwitchPrimitive.Thumb.Props) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        'bg-primary border-2 border-border dark:data-unchecked:bg-primary data-checked:bg-background dark:data-checked:bg-input pointer-events-none block size-4 rounded-md ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 mx-0.5 ',
        className,
      )}
      {...props}
    />
  )
}

export { Switch, SwitchThumb }
