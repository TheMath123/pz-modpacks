import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from '@org/design-system/components/ui/popover'
import type { IModDTO } from '@/services/mod/dtos'

export function ModRequiredModsDisplay({ data }: { data: IModDTO }) {
  if (!data.requiredMods || data.requiredMods.length === 0) {
    return null
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger
          disabled={!data.requiredMods || data.requiredMods.length === 0}
          className="text-muted-foreground text-sm"
        >
          {data.requiredMods?.length} required Mods
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            {data.requiredMods && data.requiredMods.length > 0 && (
              <ul className="list-disc pl-4">
                {data.requiredMods.map((requiredMod, index) => (
                  <li key={index}>{requiredMod}</li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  )
}
