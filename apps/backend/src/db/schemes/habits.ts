import { integer, pgEnum, pgTable, real, text, uuid } from 'drizzle-orm/pg-core'

import { timestamps } from '../helpers/timestamp'
import { usersTable } from './users'

export const habitFrequencyEnumValues = ['daily', 'weekly', 'monthly', 'every_n_days'] as const
export type HabitFrequency = (typeof habitFrequencyEnumValues)[number]
export const habitFrequencyEnum = pgEnum('frequency', habitFrequencyEnumValues)

export const habitStatusEnumValues = ['active', 'completed'] as const
export type HabitStatus = (typeof habitStatusEnumValues)[number]
export const habitStatusEnum = pgEnum('status', habitStatusEnumValues)

export const habitsTable = pgTable('habits ', {
	id: uuid().primaryKey().defaultRandom().unique(),
	userId: uuid()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	title: text().notNull(),
	frequency: habitFrequencyEnum().notNull(),
	everyN: integer(),
	targetValue: real(),
	unit: text(),
	status: habitStatusEnum().default('active').notNull(),
	...timestamps,
})

export type HabitSelect = typeof habitsTable.$inferSelect
export type HabitInsert = typeof habitsTable.$inferInsert
