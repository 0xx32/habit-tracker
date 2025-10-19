import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const loginTokensTable = pgTable('login_tokens', {
	id: uuid().primaryKey(),
	email: text('email').notNull(),
	used: boolean().notNull().default(false),
	expiresAt: timestamp().notNull(),
})

export type LoginTokenSelect = typeof loginTokensTable.$inferSelect
export type LoginTokenInsert = typeof loginTokensTable.$inferInsert
