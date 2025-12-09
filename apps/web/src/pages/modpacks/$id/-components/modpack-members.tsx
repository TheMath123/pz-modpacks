import { Button } from '@org/design-system/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@org/design-system/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@org/design-system/components/ui/dialog'
import { UserPlusIcon } from '@org/design-system/components/ui/icons'
import { toast } from '@org/design-system/components/ui/sonner'
import type { AddMemberFormData } from '@org/validation/forms/modpack'
import { useState } from 'react'
import { ModpackMembersAvatars } from '@/components/modpack/modpack-members-avatars'
import { useAddModpackMember } from '@/hooks/modpack'
import { AddMemberForm } from './add-member-form'

interface ModpackMembersProps {
  modpackId: string
}

export function ModpackMembers({ modpackId }: ModpackMembersProps) {
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false)
  const addMember = useAddModpackMember()

  const handleAddMember = async (data: AddMemberFormData) => {
    const result = await addMember.mutateAsync({
      modpackId,
      email: data.email,
    })

    if (!result.success) {
      toast.error(result.error?.message ?? 'Failed to add member')
      return
    }
    /// Error do toast com objeto de erro
    toast.success('Member added successfully')
    setAddMemberDialogOpen(false)
  }

  return (
    <div>
      <h1 className="font-medium">Members</h1>
      <ModpackMembersAvatars
        modpackId={modpackId}
        onAddMember={() => setAddMemberDialogOpen(true)}
      />
    </div>
  )
}
