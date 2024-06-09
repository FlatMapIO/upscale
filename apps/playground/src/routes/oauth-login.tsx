import { GithubLogo, GoogleLogo } from '@upscale/components/brand-logos'
import { createLoginUrl } from '@upscale/service/auth/utils'
import { invariant } from '@upscale/utils/invariant'
import { action, redirect, useSubmission } from '@solidjs/router'
import { decode } from 'decode-formdata'
import { container, stack } from '~/styled-system/patterns'
import { button } from '~/styled-system/recipes'
const oauthLogin$ = action(async (form: FormData) => {
	'use server'

	const { provider } = decode<{
		provider: string
	}>(form)
	invariant(
		provider === 'github' || provider === 'google',
		'provider is invalid',
	)

	const url = createLoginUrl('https://auth.flowsora.com/login', {
		method: 'oauth',
		provider: provider,
		appId: 'playground',
		callbackUrl: `${
			import.meta.env.DEV
				? 'http://localhost:3000'
				: 'https://playground.flowsora.com'
		}/api/auth-callback`,
	})
	return redirect(url.toString())
}, 'oauthLogin')

export default function Page() {
	const submission = useSubmission(oauthLogin$)

	return (
		<div class={container({ py: '10' })}>
			<form method='post' action={oauthLogin$} class={stack()}>
				<button
					type='submit'
					name='provider'
					value='github'
					disabled={submission.pending}
					class={button({
						variant: 'outline',
					})}
				>
					<GithubLogo />
					Github
				</button>

				<button
					type='submit'
					name='provider'
					value='google'
					disabled={submission.pending}
					class={button({
						variant: 'outline',
					})}
				>
					<GoogleLogo />
					Google
				</button>
			</form>
		</div>
	)
}
