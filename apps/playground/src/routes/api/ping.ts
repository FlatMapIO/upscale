import type { APIHandler } from '@solidjs/start/server'
import { getServerContext } from '~/lib/server/server-context'

export const GET: APIHandler = async (event) => {
	const { env } = getServerContext()
	const start = performance.now()
	const pong = await env.AUTH_SERVICE.ping()
	return {
		pong,
		took: performance.now() - start,
	}
}
