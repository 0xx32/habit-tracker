import Elysia from 'elysia'

import { habitController } from '@/modules/habit'
import { userController } from '@/modules/user'

export const protectedRoutes = new Elysia({ name: 'protected' })
	.use(userController)
	.use(habitController)
