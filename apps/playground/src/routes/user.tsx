import { cache, createAsync } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { getServerContext } from '~/lib/server/server-context'
const getUser$ = cache(async () => {
	'use server'

	const { env, event } = getServerContext()

	const cookie = event.request.headers.get('cookie')

	if (!cookie) return null

	return env.AUTH_SERVICE.validateCookie(cookie)
}, 'user')

export default function Page() {
	const user = createAsync(() => getUser$(), { deferStream: true })

	return (
		<Suspense fallback={<div>Loading</div>}>
			<p>{JSON.stringify(user() ?? {}, null, 2)}</p>
		</Suspense>
	)
}
