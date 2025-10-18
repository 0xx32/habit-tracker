import * as env from 'env-var'

const postgresConfig = {
	USER: env.get('POSTGRES_USER').required().asString(),
	PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
	HOST: env.get('POSTGRES_HOST').required().asString(),
	PORT: env.get('POSTGRES_PORT').required().asPortNumber(),
	DB_NAME: env.get('POSTGRES_DB').required().asString(),
}

export const DB_CONFIG = {
	URL: `postgresql://${postgresConfig.USER}:${postgresConfig.PASSWORD}@${postgresConfig.HOST}:${postgresConfig.PORT}/${postgresConfig.DB_NAME}`,
} as const
