import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { DB_CONFIG } from '@/config/db.config'

const pool = new Pool({
	connectionString: DB_CONFIG.URL,
})

export const db = drizzle({ client: pool, casing: 'snake_case' })
