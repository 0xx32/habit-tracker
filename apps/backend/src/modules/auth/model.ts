import { t } from 'elysia'

export const loginDto = t.Object({
	email: t.String({ format: 'email' }),
})

export const errorResponse = t.Object({
	message: t.String(),
})

export const loginQuery = t.Object({
	redirect: t.Optional(t.String()),
})

export const callbackQuery = t.Object({
	token: t.String(),
	redirect: t.String(),
})
