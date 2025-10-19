import Elysia from 'elysia'

import { authGuard } from '@/middleware/authGuard'
import { userController } from '@/modules/user'

export const protectedRoutes = new Elysia().use(authGuard).use(userController)
