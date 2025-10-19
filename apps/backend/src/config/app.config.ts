import * as env from 'env-var'

export const APP_CONFIG = {
	PORT: env.get('PORT').required().asPortNumber(),
	REDIS_PORT: env.get('REDIS_PORT').required().asPortNumber(),
	SESSION_LIFETIME: env.get('SESSION_LIFETIME').asInt(),
} as const
