/* eslint-disable no-console */
import process from 'node:process'

import { app } from './app'
import { APP_CONFIG } from './config/app.config'
import { pgClient } from './db/client'
import { redisClient } from './lib/redis'

const shutdown = async () => {
	console.log('\n🛑 Shutting down gracefully...')

	try {
		await app.stop()
		await pgClient.end()
		redisClient.close()
		console.log('✅ All connections closed')
		process.exit(0)
	} catch (err) {
		console.error('❌ Error during shutdown:', err)
		process.exit(1)
	}
}

const main = async () => {
	try {
		await pgClient.connect()
		await redisClient.connect()

		app.listen(APP_CONFIG.PORT)
	} catch (error) {
		console.error('❌ Start app failed')
		console.error(error)

		await app.stop()
		await pgClient.end()
		redisClient.close()

		process.exit(1)
	}
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

main()
