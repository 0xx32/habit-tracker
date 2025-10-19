import type { UserSelect } from '@/db/schemes/users'

import { redisClient } from '@/lib/redis'

const TTL_SECONDS_DEFAULT = 7 * 24 * 60 * 60
const SESSION_PREFIX = 'session'

interface SessionData {
	userId: UserSelect['id']
}

export abstract class SessionService {
	static _getSessionKey(key: string): string {
		return `${SESSION_PREFIX}:${key}`
	}
	static async create(userId: UserSelect['id'], ttlSeconds = TTL_SECONDS_DEFAULT): Promise<string> {
		const sessionId = crypto.randomUUID()
		const sessionData: SessionData = { userId }

		await redisClient.setex(this._getSessionKey(sessionId), ttlSeconds, JSON.stringify(sessionData))

		return sessionId
	}

	static async get(sessionId: string): Promise<SessionData | undefined> {
		const result = await redisClient.get(`${SESSION_PREFIX}:${sessionId}`)
		if (!result) return

		return JSON.parse(result) as SessionData
	}
	static async delete(sessionId: string) {
		await redisClient.del(this._getSessionKey(sessionId))
	}
	static async exists(sessionId: string): Promise<boolean> {
		return redisClient.exists(this._getSessionKey(sessionId))
	}
}
