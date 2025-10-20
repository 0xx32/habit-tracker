import { eq } from 'drizzle-orm'

import { db } from '../client'
import { habitsTable } from '../schemes/habits'

export const findUserHabits = async (userId: string) => {
	return db.select().from(habitsTable).where(eq(habitsTable.userId, userId))
}
