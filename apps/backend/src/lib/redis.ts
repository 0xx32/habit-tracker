import { RedisClient } from 'bun'

import { APP_CONFIG } from '@/config/app.config'

export const redisClient = new RedisClient(`redis://localhost:${APP_CONFIG.REDIS_PORT}`)
