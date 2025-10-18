import { Elysia, status } from 'elysia'

import { AppError } from '@/utils/errors'
import { formatValidationErrors } from '@/utils/helpers/validation-error'

import * as UserModel from './model'
import { UserService } from './service'

export const userController = new Elysia({ prefix: '/users' })
	.onError(({ code, set, error }) => {
		if (code === 'VALIDATION') {
			set.status = 400

			return {
				message: 'Invalid input',
				errors: formatValidationErrors(error.all),
			}
		}

		if (error instanceof AppError) {
			set.status = error.statusCode

			return {
				message: error.message,
			}
		}
	})
	.get(
		'/',
		async () => {
			const findedUsers = await UserService.getAll()

			return status(200, findedUsers)
		},
		{
			response: {
				200: UserModel.getUsersResponse,
				500: UserModel.errorResponse,
			},
		}
	)
	.get(
		'/:id',
		async ({ params }) => {
			const user = await UserService.getById(params.id)

			return status(200, user)
		},
		{
			params: UserModel.userUrlParams,
			response: {
				200: UserModel.userResponse,
				400: UserModel.errorResponse,
				404: UserModel.errorResponse,
				500: UserModel.errorResponse,
			},
		}
	)
	.post(
		'/',
		async ({ body }) => {
			const user = await UserService.create(body)

			return status(201, user)
		},
		{
			body: UserModel.createUserDto,
			response: {
				201: UserModel.userResponse,
				400: UserModel.errorValidationResponse,
				500: UserModel.errorResponse,
			},
		}
	)
	.patch(
		'/:id',
		async ({ params, body }) => {
			const user = await UserService.update(params.id, body)

			return status(200, user)
		},
		{
			params: UserModel.userUrlParams,
			body: UserModel.updateUserDto,
			response: {
				200: UserModel.userResponse,
				400: UserModel.errorValidationResponse,
				404: UserModel.errorResponse,
			},
		}
	)
