import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@org/design-system/components/ui/alert-dialog'
import { Button } from '@org/design-system/components/ui/button'
import { TrashIcon } from '@org/design-system/components/ui/icons'
import { useState } from 'react'
import { useArchiveModpack } from '@/hooks/modpack/use-archive-modpack'
import type { IModpackDTO } from '@/services/modpack/dtos'

interface ArchiveModpackDialogProps {
  modpack: IModpackDTO
}

export function ArchiveModpackDialog({ modpack }: ArchiveModpackDialogProps) {
  const [open, setOpen] = useState(false)
  const archiveModpack = useArchiveModpack()

  const handleArchive = async () => {
    await archiveModpack.mutateAsync({
      modpackId: modpack.id,
    })
  }

  // if (!modpack || modpack.id) {
  //   return null
  // }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={(props) => (
          <Button
            variant="default"
            aria-label="Archive Modpack"
            title="Archive Modpack"
            className="aspect-square bg-destructive hover:bg-red-800 p-0 items-center justify-center"
            {...props}
          >
            <TrashIcon className="w-4 h-4" weight="bold" />
          </Button>
        )}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Modpack</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive the modpack{' '}
            <span className="font-semibold">{modpack.name}</span>? This action
            can be undone later from your archived modpacks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={archiveModpack.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleArchive}
            disabled={archiveModpack.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {archiveModpack.isPending ? 'Archiving...' : 'Archive'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
