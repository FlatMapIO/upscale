import type { FetchEvent } from '@solidjs/start/server'

const CF_WORKER = Symbol('CF_WORKER')

export async function setupWorkerStartLocals(event: FetchEvent): Promise<void> {
	if (import.meta.env.DEV) {
		// @ts-ignore
		if (!globalThis[CF_WORKER]) {
			console.time('took')
			const cf = await import('wrangler')

			const proxy = await cf.getPlatformProxy({ persist: true })
			console.timeEnd('took')

			// @ts-ignore
			globalThis[CF_WORKER] = proxy
		}
		if (!event.locals.cloudflare) {
			event.locals.cloudflare = {
				// @ts-ignore
				...globalThis[CF_WORKER],
				env: {
					...(typeof process !== 'undefined' ? process.env : {}),
					// @ts-ignore
					...globalThis[CF_WORKER].env,
				},
			} as any
		}
	} else {
		event.locals.cloudflare = {
			cf: event.nativeEvent.context.cf,
			...event.nativeEvent.context.cloudflare,
		}
	}
}
