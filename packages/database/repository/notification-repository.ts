import { desc, eq } from 'drizzle-orm'
import { database } from '..'
import { notifications } from '../schemas/notifications'

export const notificationRepository = {
  create: async (data: typeof notifications.$inferInsert) => {
    const [notification] = await database
      .insert(notifications)
      .values(data)
      .returning()
    return notification
  },

  listByUserId: async (userId: string, limit = 20) => {
    return database
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
  },

  markAsRead: async (id: string, _userId: string) => {
    const [notification] = await database
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id)) // Adicionar verificação de userId se necessário para segurança extra
      .returning()
    return notification
  },

  markAllAsRead: async (userId: string) => {
    return database
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId))
  },
}
