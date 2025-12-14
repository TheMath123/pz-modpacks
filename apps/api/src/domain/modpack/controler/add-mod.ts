import type { User } from '@org/auth/types'
import { modpackMemberRepository, modpackRepository } from '@org/database'
import type { AddModInModpackFormData } from '@org/validation/forms/mod/add-mod-in-modpack.schema'
import { ApiResponse, extractWorkshopId } from '@/utils'
import { addModToModpackService } from '../services/add-mod-to-modpack'

interface AddModControllerParams {
  body: AddModInModpackFormData
  params: {
    id: string // modpackId
  }
  user: User
}

export async function addModController({
  body,
  params,
  user,
}: AddModControllerParams) {
  const { id: modpackId } = params
  const { modAtribute } = body

  // 1. Check permissions
  const modpack = await modpackRepository.findById(modpackId)
  if (!modpack) {
    return new ApiResponse({ error: { message: 'Modpack not found' } }, 404)
  }

  if (!modpack.isActive) {
    return new ApiResponse({ error: { message: 'Modpack is not active' } }, 401)
  }

  const isOwner = modpack.owner === user.id
  let isMember = false

  if (!isOwner) {
    const member = await modpackMemberRepository.findMember(modpackId, user.id)
    // TODO: Check specific permission like 'ADD_MOD'
    if (member?.isActive) {
      isMember = true
    }
  }

  if (!isOwner && !isMember) {
    return new ApiResponse(
      { error: { message: 'You do not have permission to add mods' } },
      403,
    )
  }

  // 2. Extract Workshop ID
  const workshopId = extractWorkshopId(modAtribute.toString())
  if (!workshopId) {
    return new ApiResponse(
      { error: { message: 'Invalid Workshop ID or URL' } },
      400,
    )
  }

  // 3. Process Mod (Recursive)
  const processedWorkshopIds = new Set<string>()
  const addedMods: string[] = []

  try {
    await addModToModpackService.execute(
      workshopId,
      modpackId,
      processedWorkshopIds,
      addedMods,
    )
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return new ApiResponse({ error: { message: errorMessage } }, 400)
  }

  return new ApiResponse(
    {
      message: 'Mod added successfully',
      addedModsCount: addedMods.length,
      addedMods,
    },
    201,
  )
}
