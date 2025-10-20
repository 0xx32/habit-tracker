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

export const deleteLoginToken = async (id: LoginTokenSelect['id']) => {
	const result = await db.delete(loginTokensTable).where(eq(loginTokensTable.id, id)).returning()
	return result[0]
}
