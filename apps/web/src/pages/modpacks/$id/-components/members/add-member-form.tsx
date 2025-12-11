import { useAppForm } from '@org/design-system/components/ui/form-tanstack'
import { addMemberFormSchema } from '@org/validation/forms/modpack'
import { useEffect } from 'react'
import { SubmitButton, TextField } from '@/components/form'
import { useAddModpackMember } from '@/hooks'

interface AddMemberFormProps {
  onSuccess: () => void
  modpackId: string
}

export function AddMemberForm({ onSuccess, modpackId }: AddMemberFormProps) {
  const addMember = useAddModpackMember()
  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: addMemberFormSchema,
    },
    onSubmit: async ({ value }) =>
      await addMember.mutateAsync({
        modpackId,
        email: value.email,
      }),
  })

  useEffect(() => {
    if (addMember.isSuccess) {
      form.reset()
      onSuccess()
    }
  }, [addMember.isSuccess])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <TextField
        form={form}
        name="email"
        label="Email *"
        placeholder="user@example.com"
        inputMode="email"
        disabled={addMember.isPending}
      />

      <SubmitButton
        isLoading={addMember.isPending}
        label="Add Member"
        loadingLabel="Adding.."
      />
    </form>
  )
}
