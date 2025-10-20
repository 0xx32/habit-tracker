import Elysia, { NotFoundError } from 'elysia'

import { authGuard } from '@/middleware/authGuard'

import * as HabitModel from './model'
import { HabitService } from './service'
export const habitController = new Elysia({ prefix: '/habits' })
	.use(authGuard)
	.get('/', async ({ query, user }) => HabitService.getAll(user.id, query), {
		query: HabitModel.getHabitsQuery,
		response: {
			200: HabitModel.getHabitsResponse,
		},
	})
	.get(
		'/:id',
		async ({ params, user }) => {
			const habit = await HabitService.getById(user.id, params.id)
			if (!habit) throw new NotFoundError('Habit not found')

			return habit
		},
		{
			params: HabitModel.getHabitParams,
			response: {
				200: HabitModel.habitSchema,
				404: HabitModel.notFound,
			},
		}
	)
