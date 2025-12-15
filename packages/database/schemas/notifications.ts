import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../utils/schemas-types'
import { users } from './users'

export const notifications = pgTable('notifications', {
  id,
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  type: text('type', { enum: ['info', 'success', 'warning', 'error'] })
    .default('info')
    .notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  metadata: text('metadata'),
  createdAt,
  updatedAt,
})
