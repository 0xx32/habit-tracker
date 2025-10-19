import { t } from 'elysia'

const userSchema = t.Object({
	id: t.String(),
	email: t.String({ format: 'email' }),
	nickname: t.Union([t.String(), t.Null()]),
	name: t.Union([t.String(), t.Null()]),
	level: t.Number(),
	xp: t.Number(),
	created_at: t.Date(),
	updated_at: t.Union([t.Date(), t.Null()]),
	deleted_at: t.Union([t.Date(), t.Null()]),
})
export type User = typeof userSchema.static
export const userResponse = userSchema
export const userUrlParams = t.Pick(userSchema, ['id'])

export const getUsersResponse = t.Array(userSchema)

export const createUserDto = t.Pick(userSchema, ['email'])
export type CreateUserDto = typeof createUserDto.static

export const updateUserDto = t.Partial(createUserDto)
export type UpdateUserDto = Partial<typeof createUserDto.static>

export const errorValidationResponse = t.Object({
	message: t.String(),
	errors: t.Array(
		t.Object({
			field: t.String(),
			message: t.String(),
			value: t.String(),
		})
	),
})

export const errorResponse = t.Object({
	message: t.String(),
})
