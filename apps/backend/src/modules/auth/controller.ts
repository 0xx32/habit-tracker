import Elysia, { status } from 'elysia'

import { APP_CONFIG } from '@/config/app.config'

import * as AuthModel from './model'
import { AuthService } from './service'

export const authController = new Elysia({ prefix: '/auth' })
	.post(
		'/login',
		async ({ body: { email }, query }) => {
			const isSent = await AuthService.sendLoginLink(email, query.redirect ?? '/')

			if (!isSent) {
				return status(400, { message: 'Failed to send login link' })
			}

			return status(200)
		},
		{
			body: AuthModel.loginDto,
			query: AuthModel.loginQuery,
			response: {
				400: AuthModel.errorResponse,
			},
		}
	)
	.get(
		'/callback',
		async ({ query, cookie, redirect }) => {
			if (!query.token) {
				return status(400, { message: 'Token required' })
			}

			const sessionId = await AuthService.verifyToken(query.token)

			cookie.session.set({
				value: sessionId,
				httpOnly: true,
				maxAge: APP_CONFIG.SESSION_LIFETIME,
				path: '/',
			})

			return redirect('/', 302)
		},
		{
			query: AuthModel.callbackQuery,
			response: {
				400: AuthModel.errorResponse,
			},
		}
	)
