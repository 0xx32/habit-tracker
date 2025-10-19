import { DrizzleQueryError } from 'drizzle-orm'
import { DatabaseError } from 'pg'

import { createUser, findUserById, findUsers, updateUser } from '@/db/crud/users'
import { ERROR_CODES } from '@/utils/constants/errors'
import { ConflictError, InternalServerError, NotFoundError } from '@/utils/errors'

import type * as UserModel from './model'

export abstract class UserService {
	static async getAll() {
		const users = await findUsers()
		return users
	}

	static async getById(id: UserModel.User['id']) {
		try {
			const user = await findUserById(id)

			if (!user) {
				throw new NotFoundError(`User with id ${id} not found`, ERROR_CODES.USER_NOT_FOUND)
			}

			return user
		} catch (error: unknown) {
			if (error instanceof DrizzleQueryError) {
				const originalError = error.cause

				if (originalError instanceof DatabaseError && originalError.code === '22P02') {
					throw new NotFoundError(
						`User with id ${id} not found or user id is invalid`,
						ERROR_CODES.USER_NOT_FOUND
					)
				}
			}

			console.error(error)
			throw new InternalServerError('Failed to find user', ERROR_CODES.INTERNAL_SERVER_ERROR)
		}
	}

	static async create(data: UserModel.CreateUserDto) {
		try {
			const user = await createUser(data)
			return user
		} catch (error: unknown) {
			if (error instanceof DrizzleQueryError) {
				const originalError = error.cause

				if (originalError instanceof DatabaseError) {
					if (originalError.code === '23505' && originalError.constraint === 'users_email_unique') {
						throw new ConflictError('User already exists', ERROR_CODES.USER_ALREADY_EXISTS)
					}
				}
			}

			console.error(error)
			throw new InternalServerError('Failed to create user', ERROR_CODES.INTERNAL_SERVER_ERROR)
		}
	}
	static async update(id: UserModel.User['id'], data: UserModel.UpdateUserDto) {
		try {
			const updatedUser = await updateUser(id, data)

			if (!updatedUser) {
				throw new NotFoundError(`User with id ${id} not found`, ERROR_CODES.USER_NOT_FOUND)
			}

			return updatedUser
		} catch (error: unknown) {
			if (error instanceof DrizzleQueryError) {
				const originalError = error.cause

				if (originalError instanceof DatabaseError && originalError.code === '22P02') {
					throw new NotFoundError(
						`User with id ${id} not found or user id is invalid`,
						ERROR_CODES.USER_NOT_FOUND
					)
				}
			}

			console.error(error)
			throw new InternalServerError('Failed to update user', ERROR_CODES.INTERNAL_SERVER_ERROR)
		}
	}
}
