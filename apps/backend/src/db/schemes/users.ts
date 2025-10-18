import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

import { timestamps } from '../helpers/timestamp'

export const usersTable = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	email: text('email').unique().notNull(),
	nickname: text().unique().notNull(),
	name: text('name'),
	level: integer('level').notNull().default(1),
	xp: integer('xp').notNull().default(0),
	...timestamps,
})

export type User = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert
