import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { timestamps } from '../helpers/timestamp'

export const usersTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom().unique(),
	email: text().unique().notNull(),
	nickname: text().unique().notNull(),
	name: text(),
	level: integer().notNull().default(1),
	xp: integer().notNull().default(0),
	...timestamps,
})

export type UserSelect = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert
