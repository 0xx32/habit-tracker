import * as env from 'env-var'

export const APP_CONFIG = {
	PORT: env.get('PORT').required().asPortNumber(),
} as const
