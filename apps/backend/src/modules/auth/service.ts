import { DrizzleQueryError } from 'drizzle-orm'
import crypto from 'node:crypto'
import { DatabaseError } from 'pg'

import { APP_CONFIG } from '@/config/app.config'
import { db } from '@/db/client'
import { findLoginTokenById, updateLoginToken } from '@/db/crud/login-tokens'
import { findUserByEmail } from '@/db/crud/users'
import { loginTokensTable } from '@/db/schemes/login-tokens'
import { UserService } from '@/modules/user'
import { SessionService } from '@/services/session.service'
import { ConflictError, ServiceError } from '@/utils/errors'

const TOKEN_LIFETIME = 15 //min

export abstract class AuthService {
	static async sendLoginLink(email: string, redirectUrl: string): Promise<{ success: boolean }> {
		const token = crypto.randomUUID()
		const expiresAt = new Date(Date.now() + TOKEN_LIFETIME * 60 * 1000)

		try {
			await db.insert(loginTokensTable).values({
				id: token,
				email,
				expiresAt,
			})

			const link = `http://localhost:4444/api/auth/callback?token=${token}&redirect=${redirectUrl}`
			// eslint-disable-next-line no-console
			console.log(`📧 Magic link for ${email}: ${link}`)

			return { success: true }
		} catch (error) {
			if (error instanceof DrizzleQueryError) {
				const originalError = error.cause

				if (originalError instanceof DatabaseError) {
					throw new ServiceError('Auth', 'Failed inserting login token')
				}
			}

			console.error(error)
			return { success: false }
		}
	}

	static async verifyToken(token: string): Promise<string> {
		try {
			const dbToken = await findLoginTokenById(token)

			if (!dbToken) throw new Error('Invalid token')
			if (dbToken.used) throw new Error('Token already used')
			if (dbToken.expiresAt < new Date()) throw new Error('Token expired')

			await updateLoginToken(token, { used: true })

			let user = await findUserByEmail(dbToken.email)

			if (!user) {
				const newUser = await UserService.create({ email: dbToken.email })
				user = newUser
			}

			const sessionId = await SessionService.create(user.id, APP_CONFIG.SESSION_LIFETIME)

			return sessionId
		} catch (error) {
			if (error instanceof Error) {
				throw new ServiceError('Auth', error.message)
			}

			if (error instanceof ConflictError) {
				throw new ServiceError(
					'Auth',
					`Failed create user. code: ${error.code}, error: ${error.message}`
				)
			}

			console.error(error)
			throw error
		}
	}
}
