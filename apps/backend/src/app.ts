import { Elysia } from 'elysia'

import { APP_CONFIG } from './config/app.config'
import { userController } from './modules/user'

const app = new Elysia()
	.use(userController)
	.get('/', () => 'Hello Elysia')
	.listen(3000)
	.onStart(() => {
		// eslint-disable-next-line no-console
		console.info(`Server started on port ${APP_CONFIG.PORT}`)
	})

app.listen(APP_CONFIG.PORT)
