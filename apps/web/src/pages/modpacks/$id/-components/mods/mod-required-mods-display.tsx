import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from '@org/design-system/components/ui/popover'
import { cn } from '@org/design-system/lib/utils'
import { Link } from '@tanstack/react-router'
import { useModByWorkshopId } from '@/hooks/mod'
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
          render={
            <button
              type="button"
              className="px-2 py-1 rounded-md border-2 border-orange-300/30 bg-orange-500/5 text-orange-500 text-xs hover:bg-orange-500/80 hover:text-white cursor-pointer hover:border-orange-500/80"
            >
              {data.requiredMods?.length} required
            </button>
          }
        ></PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent className="overflow-y-auto">
            <h2 className="font-medium text-muted-foreground">
              Mods Required ({data.requiredMods?.length})
            </h2>
            {data.requiredMods && data.requiredMods.length > 0 && (
              <ul className="list-none space-y-2">
                {data.requiredMods.map((workshopId, index) => (
                  <li key={index} className="">
                    <ModRequiredCard workshopId={workshopId} index={index} />
                  </li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  )
}

function ModRequiredCard({
  workshopId,
  index,
}: {
  workshopId: string
  index: number
}) {
  const { data, isLoading, error } = useModByWorkshopId(workshopId)
  if (error || !data) {
    return (
      <div
        className={cn(
          index === 0 && 'border-0',
          'text-sm text-muted-foreground border-2 p-1 border-muted-foreground',
        )}
      >
        {workshopId}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          index === 0 && 'border-0',
          'bg-muted-foreground animate-pulse border-t-2 border-border',
        )}
      />
    )
  }
  return (
    <div
      className={cn(
        index === 0 && 'border-none',
        'flex flex-row items-center border-t-2 border-border py-2 gap-2',
      )}
    >
      {data.avatarUrl && (
        <img
          src={data.avatarUrl}
          alt={data.name}
          width={32}
          className="w-12 h-12 rounded-md border-2 border-border/5"
        />
      )}
      <div className="flex flex-col gap-1 w-full text-sm">
        <Link
          className="hover:underline font-semibold"
          to={data.steamUrl ?? ''}
        >
          {data.name}
        </Link>
        <span className="text-muted-foreground py-1 px-2 bg-muted rounded-md w-fit text-xs select-all select">
          {workshopId}
        </span>
        {data.requiredMods && data.requiredMods?.length > 0 && (
          <span className="text-muted-foreground w-fit text-xs">
            {data.requiredMods?.length} required
          </span>
        )}
      </div>
    </div>
  )
}
