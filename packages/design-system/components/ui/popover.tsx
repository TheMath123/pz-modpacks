import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover'
import { cn } from '@org/design-system/lib/utils'
import * as React from 'react'

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverPositioner({
  sideOffset = 4,
  portal,
  className,
  ...props
}: PopoverPrimitive.Positioner.Props & {
  portal?: PopoverPrimitive.Portal.Props
}) {
  return (
    <PopoverPrimitive.Portal {...portal}>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        sideOffset={sideOffset}
        className={cn('z-50', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverContent({ className, ...props }: PopoverPrimitive.Popup.Props) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-content"
      className={cn(
        'z-50 w-72 border-2 bg-background p-4 text-popover-foreground  outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin] shadow',
        className,
      )}
      {...props}
    />
  )
}

function PopoverAnchor({ ...props }: PopoverPrimitive.Arrow.Props) {
  return <PopoverPrimitive.Arrow data-slot="popover-anchor" {...props} />
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPositioner,
}
