import { setupWorkerStartLocals } from '@mono/solid-start/setup-worker-locals'
import { createMiddleware } from '@solidjs/start/middleware'

export default createMiddleware({
	onRequest: [
		async (event) => {
			await setupWorkerStartLocals(event)
		},
	],
	onBeforeResponse: [(event, { body }) => {}],
})
