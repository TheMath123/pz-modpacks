import { z } from '@org/validation/zod'

export const modpackIdParamSchema = z.object({
  id: z.uuid({ error: 'Invalid modpack ID format' }),
})

export const memberIdParamSchema = z.object({
  modpackId: z.uuid({ error: 'Invalid modpack ID format' }),
  memberId: z.uuid({ error: 'Invalid member ID format' }),
})

export type ModpackIdParam = z.infer<typeof modpackIdParamSchema>
export type MemberIdParam = z.infer<typeof memberIdParamSchema>
