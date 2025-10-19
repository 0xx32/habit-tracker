import { Elysia, t } from 'elysia'

import { findUserById } from '@/db/crud/users'
import { SessionService } from '@/services/session.service'
import { UnauthorizedError } from '@/utils/errors'

export const authGuard = new Elysia({ name: 'authGuard' })
	.guard({
		cookie: t.Cookie(
			{
				session: t.String(),
			},
			{
				httpOnly: true,
			}
		),
	})
	.derive(async ({ cookie }) => {
		const sessionId = cookie.session.value as string
		if (!sessionId) throw new UnauthorizedError('Unauthorized')

		const session = await SessionService.get(sessionId)
		if (!session) throw new UnauthorizedError('Unauthorized')

		const user = await findUserById(session.userId)
		if (!user) throw new UnauthorizedError('Unauthorized')

		return { user }
	})
	.as('scoped')
