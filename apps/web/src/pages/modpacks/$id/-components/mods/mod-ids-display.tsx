import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from '@org/design-system/components/ui/popover'
import type { IModDTO } from '@/services/mod/dtos'

export function ModIdsDisplay({ data }: { data: IModDTO }) {
  return (
    <div>
      <Popover>
        <PopoverTrigger
          disabled={!data.steamModId || data.steamModId.length === 0}
          className="text-muted-foreground text-sm"
        >
          {data.steamModId?.length} mod IDs
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            {data.steamModId && data.steamModId.length > 0 && (
              <ul className="list-disc pl-4">
                {data.steamModId.map((mapFolder, index) => (
                  <li key={index}>{mapFolder}</li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  )
}
