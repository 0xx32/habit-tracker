import html from '@elysiajs/html'
import openapi from '@elysiajs/openapi'
import { Elysia } from 'elysia'

import { APP_CONFIG } from './config/app.config'
import { authController } from './modules/auth'
import { protectedRoutes } from './routes/protected'

export const app = new Elysia({ prefix: 'api' })
	.use(authController)
	.use(protectedRoutes)
	.use(html())
	.use(openapi())
	.onStart(() => {
		// eslint-disable-next-line no-console
		console.info(`Server started on port ${APP_CONFIG.PORT}`)
	})
