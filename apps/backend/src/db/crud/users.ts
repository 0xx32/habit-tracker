import { eq } from 'drizzle-orm'

import type { User, UserInsert } from '../schemes/users'

import { db } from '../client'
import { usersTable } from '../schemes/users'

export const findUsers = async () => db.select().from(usersTable)

export const findUserById = async (id: User['id']) => {
	const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
	return user[0]
}

export const createUser = async (user: UserInsert) => {
	const newUser = await db.insert(usersTable).values(user).returning()
	return newUser[0]
}

export const updateUser = async (id: User['id'], user: UserInsert) => {
	const updatedUser = await db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning()
	return updatedUser[0]
}

export const deleteUser = async (id: User['id']) => {
	const deletedUser = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()
	return deletedUser[0]
}
