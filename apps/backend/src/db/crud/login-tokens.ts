import { eq } from 'drizzle-orm'

import type { LoginTokenInsert, LoginTokenSelect } from '../schemes/login-tokens'

import { db } from '../client'
import { loginTokensTable } from '../schemes/login-tokens'

export const findLoginTokenById = async (id: LoginTokenSelect['id']) => {
	const result = await db.select().from(loginTokensTable).where(eq(loginTokensTable.id, id))
	return result[0]
}

export const createLoginToken = async (payload: Omit<LoginTokenInsert, 'used'>) => {
	const result = await db.insert(loginTokensTable).values(payload).returning()
	return result[0]
}

export const updateLoginToken = async (
	id: LoginTokenSelect['id'],
	payload: Partial<LoginTokenInsert>
) => {
	const result = await db
		.update(loginTokensTable)
		.set(payload)
		.where(eq(loginTokensTable.id, id))
		.returning()
	return result[0]
}
