import { eq } from 'drizzle-orm'

import type { UserInsert, UserSelect } from '../schemes/users'

import { db } from '../client'
import { usersTable } from '../schemes/users'

export const findUsers = async () => db.select().from(usersTable)

export const findUserById = async (id: UserSelect['id']) => {
	const result = await db.select().from(usersTable).where(eq(usersTable.id, id))
	return result[0]
}

export const createUser = async (user: UserInsert) => {
	const result = await db.insert(usersTable).values(user).returning()
	return result[0]
}

export const updateUser = async (id: UserSelect['id'], user: Partial<UserInsert>) => {
	const result = await db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning()
	return result[0]
}

export const deleteUser = async (id: UserSelect['id']) => {
	const result = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()
	return result[0]
}
