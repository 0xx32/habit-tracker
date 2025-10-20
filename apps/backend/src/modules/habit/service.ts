import { and, eq } from 'drizzle-orm'

import type { HabitFrequency, HabitSelect, HabitStatus } from '@/db/schemes/habits'
import type { UserSelect } from '@/db/schemes/users'

import { db } from '@/db/client'
import { habitsTable } from '@/db/schemes/habits'

interface GetHabitFilters {
	frequency?: HabitFrequency
	status?: HabitStatus
}

export abstract class HabitService {
	static async getAll(userId: UserSelect['id'], filters?: GetHabitFilters): Promise<HabitSelect[]> {
		const conditions = [eq(habitsTable.userId, userId)]

		if (filters?.frequency) {
			conditions.push(eq(habitsTable.frequency, filters.frequency))
		}
		if (filters?.status) {
			conditions.push(eq(habitsTable.status, filters.status))
		}

		const habits = await db
			.select()
			.from(habitsTable)
			.where(and(...conditions))

		return habits
	}

	static async getById(
		userId: UserSelect['id'],
		id: HabitSelect['id']
	): Promise<HabitSelect | undefined> {
		const habit = await db
			.select()
			.from(habitsTable)
			.where(and(eq(habitsTable.userId, userId), eq(habitsTable.id, id)))
			.limit(1)

		return habit[0]
	}
}
