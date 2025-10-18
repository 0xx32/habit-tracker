import { Elysia } from 'elysia'

import { APP_CONFIG } from './config/app.config'
import { userController } from './modules/user'

new Elysia()
	.use(userController)
	.get('/', () => 'Hello Elysia')
	.onStart(() => {
		// eslint-disable-next-line no-console
		console.info(`Server started on port ${APP_CONFIG.PORT}`)
	})
	.listen(APP_CONFIG.PORT)
