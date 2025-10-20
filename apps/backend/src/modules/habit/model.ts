import { t } from 'elysia'

export const notFound = t.String()

const habitFrequency = t.Union([
	t.Literal('daily'),
	t.Literal('weekly'),
	t.Literal('monthly'),
	t.Literal('every_n_days'),
])
const habitStatus = t.Union([t.Literal('active'), t.Literal('completed')])

export const habitSchema = t.Object({
	id: t.String(),
	userId: t.String(),
	title: t.String(),
	frequency: habitFrequency,
	status: habitStatus,
	everyN: t.Union([t.Integer(), t.Null()]),
	targetValue: t.Union([t.Number(), t.Null()]),
	unit: t.Union([t.String(), t.Null()]),
	created_at: t.Date(),
	updated_at: t.Union([t.Date(), t.Null()]),
	deleted_at: t.Union([t.Date(), t.Null()]),
})

export const getHabitsQuery = t.Object({
	frequency: t.Optional(habitFrequency),
	status: t.Optional(habitStatus),
})
export const getHabitsResponse = t.Array(habitSchema)

export const getHabitParams = t.Object({
	id: t.String(),
})
