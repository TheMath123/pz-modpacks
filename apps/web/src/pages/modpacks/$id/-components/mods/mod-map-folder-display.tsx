import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from '@org/design-system/components/ui/popover'
import type { IModDTO } from '@/services/mod/dtos'

export function ModMapFolderDisplay({ data }: { data: IModDTO }) {
  if (!data.mapFolders || data.mapFolders.length === 0) {
    return null
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger className="text-muted-foreground text-sm">
          {data.mapFolders?.length} mapFolders
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            {data.mapFolders && data.mapFolders.length > 0 && (
              <ul className="list-disc pl-4">
                {data.mapFolders.map((mapFolder, index) => (
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
