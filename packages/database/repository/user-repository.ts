import { eq } from 'drizzle-orm'
import { database } from '../index'
import type { DUser } from '../schemas'
import { users } from '../schemas'

export class UserRepository {
  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<DUser | undefined> {
    return database.query.users.findFirst({
      where: eq(users.email, email),
    })
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<DUser | undefined> {
    return database.query.users.findFirst({
      where: eq(users.id, id),
    })
  }
}

export const userRepository = new UserRepository()
