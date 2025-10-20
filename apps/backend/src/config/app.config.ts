import * as env from 'env-var'

export const APP_CONFIG = {
	PORT: env.get('PORT').required().asPortNumber(),
	PROJECT_NAME: env.get('PROJECT_NAME').required().asString().replaceAll('_', ' '),
	REDIS_PORT: env.get('REDIS_PORT').required().asPortNumber(),
	SESSION_LIFETIME: env.get('SESSION_LIFETIME').asInt(),
	RESEND_API_KEY: env.get('RESEND_API_KEY').required().asString(),
	EMAIL_FROM: env.get('EMAIL_FROM').required().asString(),
} as const
