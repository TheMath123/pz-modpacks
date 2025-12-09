import z from 'zod'

export const addMemberFormSchema = z.object({
  email: z.email({ error: 'Invalid email format' }),
})

export type AddMemberFormData = z.infer<typeof addMemberFormSchema>
