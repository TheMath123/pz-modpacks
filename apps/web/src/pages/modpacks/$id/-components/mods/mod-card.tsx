import { Card, CardTitle } from '@org/design-system/components/ui/card'
import { useTheme } from '@org/design-system/providers'
import { Link } from '@tanstack/react-router'
import type { IModDTO } from '@/services/mod/dtos'
import { ModDetail } from './mod-detail'
import { RemoveModDialog } from './remove-mod-dialog'

interface ModCardProps {
  data: IModDTO
  canManage: boolean
  modpackId: string
}

export function ModCard({ data, modpackId, canManage }: ModCardProps) {
  const { theme } = useTheme()

  if (!data || !modpackId) return null

  console.log(data)

  return (
    <Card className="flex flex-row items-center p-0 overflow-hidden gap-0">
      <div className="relative bg-primary/30 dark:bg-primary aspect-square h-32 flex items-center justify-center  text-muted-foreground/20 overflow-clip">
        {data.avatarUrl ? (
          <img
            src={data.avatarUrl}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={
              theme === 'light'
                ? '/brand/zumbi-danced.svg'
                : '/brand/zumbi-danced-dark.svg'
            }
            alt={data.name}
            className="h-8 opacity-80"
          />
        )}
      </div>
      <div className="flex flex-col items-start justify-between gap-2 p-2 h-full ">
        <div className="space-y-2">
          <Link
            to={data.steamUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <CardTitle>{data.name}</CardTitle>
          </Link>
          <ModDetail data={data} />
        </div>

        {canManage && (
          <RemoveModDialog
            modpackId={modpackId}
            modId={data.id}
            modName={data.name}
          />
        )}
      </div>
    </Card>
  )
}
