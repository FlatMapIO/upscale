import { createClient as createClientLocal } from '@libsql/client'
import { createClient as createClientWeb } from '@libsql/client/web'
import type { Client } from '@libsql/core/api'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'

export const LOCAL_DB_URL = 'file:local.db'

export type Database = LibSQLDatabase<Record<string, never>>

export const createClient = (vars: {
	database_url: string
	database_auth_token: string
}): Client => (import.meta.env.DEV ? ceateLocalClient() : createWebClient(vars))

function ceateLocalClient(): Client {
	const url = LOCAL_DB_URL
	console.info('create libsql local client', {
		url,
	})
	return createClientLocal({ url })
}

function createWebClient(vars: {
	database_url: string
	database_auth_token: string
}): Client {
	console.info('create libsql web client', {
		url: vars.database_url,
	})
	return createClientWeb({
		url: vars.database_url,
		authToken: vars.database_auth_token,
	})
}

export function createDatabase(vars: {
	database_url: string
	database_auth_token: string
	logger?: boolean
}): Database {
	return drizzle(createClient(vars), {
		logger: vars.logger,
	})
}
