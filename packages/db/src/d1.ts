import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'

export type Database = DrizzleD1Database<Record<string, never>>

export function createDatabase(d1: D1Database): Database {
	return drizzle(d1, {
		logger: import.meta.env.DEV,
	})
}
