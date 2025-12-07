import { modpackController } from '@/domain/modpack/controler'
import {
  addMemberSchema,
  createModpackSchema,
  listModpacksQuerySchema,
  modpackIdParamSchema,
  updateModpackSchema,
} from '@/domain/modpack/validations'
import type { Server } from '../server'

export function modpacksRoutes(app: Server) {
  app.group('/modpacks', (route) => {
    // List public modpacks (no auth required)
    route.get(
      '/public',
      async ({ status, query }) => {
        const res = await modpackController.listPublic({ query })
        return status(res.status, res.value)
      },
      {
        query: listModpacksQuerySchema,
        detail: {
          tags: ['Modpacks'],
          description: 'List all public modpacks with pagination and filters',
          summary: 'List Public Modpacks',
        },
      },
    )

    // List user's modpacks (auth required)
    route.get(
      '/my',
      async ({ status, query, user }) => {
        const res = await modpackController.listMy({ query, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        query: listModpacksQuerySchema,
        detail: {
          tags: ['Modpacks'],
          description:
            'List modpacks owned by or shared with the authenticated user',
          summary: 'List My Modpacks',
        },
      },
    )

    // Create modpack
    route.post(
      '/',
      async ({ status, body, user }) => {
        const res = await modpackController.create({ body, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        body: createModpackSchema,
        detail: {
          tags: ['Modpacks'],
          description: 'Create a new modpack',
          summary: 'Create Modpack',
        },
      },
    )

    // Update modpack
    route.patch(
      '/:id',
      async ({ status, params, body, user }) => {
        const res = await modpackController.update({ params, body, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: modpackIdParamSchema,
        body: updateModpackSchema,
        detail: {
          tags: ['Modpacks'],
          description: 'Update modpack details (owner only)',
          summary: 'Update Modpack',
        },
      },
    )

    // Archive modpack
    route.delete(
      '/:id',
      async ({ status, params, user }) => {
        const res = await modpackController.archive({ params, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: modpackIdParamSchema,
        detail: {
          tags: ['Modpacks'],
          description: 'Archive a modpack (soft delete, owner only)',
          summary: 'Archive Modpack',
        },
      },
    )

    // List members
    route.get(
      '/:id/members',
      async ({ status, params, user }) => {
        const res = await modpackController.listMembers({ params, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: modpackIdParamSchema,
        detail: {
          tags: ['Modpacks'],
          description: 'List all members of a modpack (owner and members only)',
          summary: 'List Modpack Members',
        },
      },
    )

    // Add member
    route.post(
      '/:id/members',
      async ({ status, params, body, user }) => {
        const res = await modpackController.addMember({ params, body, user })
        return status(res.status, res.value)
      },
      {
        auth: true,
        params: modpackIdParamSchema,
        body: addMemberSchema,
        detail: {
          tags: ['Modpacks'],
          description: 'Add a member to the modpack (owner only)',
          summary: 'Add Modpack Member',
        },
      },
    )

    // Remove member
    route.delete(
      '/:id/members/:memberId',
      async ({ status, params, user }) => {
        const modifiedParams = {
          modpackId: params.id,
          memberId: params.memberId,
        }
        const res = await modpackController.removeMember({
          params: modifiedParams,
          user,
        })
        return status(res.status, res.value)
      },
      {
        auth: true,
        detail: {
          tags: ['Modpacks'],
          description: 'Remove a member from the modpack (owner only)',
          summary: 'Remove Modpack Member',
        },
      },
    )

    return route
  })

  return app
}
