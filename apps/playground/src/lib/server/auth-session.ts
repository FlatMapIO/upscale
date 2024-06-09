import type { Session, User } from 'lucia'
import { getServerContext } from './server-context'

type UserSession = { session: Session; user: User }

export function getUserSession(id: string): Promise<UserSession | null> {
	const { env } = getServerContext()
	return env.KV.get<UserSession>(`session:${id}`, 'json')
}

export function storeUserSession(session: {
	session: Session
	user: User
}): Promise<void> {
	const { env } = getServerContext()

	return env.KV.put(`session:${session.session.id}`, JSON.stringify(session), {
		expiration: (session.session.expiresAt.getTime() / 1000) | 0,
	})
}
