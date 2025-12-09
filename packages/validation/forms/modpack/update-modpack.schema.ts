import z from 'zod'
import { createModpackFormSchema } from './create-modpack.schema'

export const updateModpackFormSchema = createModpackFormSchema.extend({
  isPublic: z.boolean().optional(),
})

export type UpdateModpackFormData = z.infer<typeof updateModpackFormSchema>
