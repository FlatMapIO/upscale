import { Hono } from 'hono'
import type { IAuthService } from '@mono/service/auth/types'
const app = new Hono<{
	Bindings: {
		AUTH_SERVICE: IAuthService
		KV: KVNamespace
	}
}>()
	.get('/', (c) => c.json({ status: 'UP' }))
	.get('/ping', async (c) => {
		return c.json({
			ping: await c.env.AUTH_SERVICE.ping(),
		})
	})

export default app
