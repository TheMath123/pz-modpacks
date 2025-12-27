import { Button } from '@org/design-system/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { PencilIcon } from '@org/design-system/components/ui/icons'
import { useState } from 'react'
import type { IModpackDTO } from '@/services/modpack/dtos'
import { UpdateModpackForm } from './update-modpack-form'

interface UpdateModpackDialogProps {
  modpack: IModpackDTO
}

export function UpdateModpackDialog({ modpack }: UpdateModpackDialogProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  return (
    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <DialogTrigger
        className="aspect-square w-fit"
        render={
          <Button aria-label="Edit Modpack" title="Edit Modpack" size="icon">
            <PencilIcon className="h-5 w-5" weight="bold" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-125 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Modpack</DialogTitle>
          <DialogDescription>Update your modpack information</DialogDescription>
        </DialogHeader>
        <UpdateModpackForm
          modpack={modpack}
          onSuccess={() => setEditDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
