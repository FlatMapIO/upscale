import { Title } from '@solidjs/meta'
import { css, cx } from '~/styled-system/css'
import { container, grid, stack } from '~/styled-system/patterns'
import { button, text } from '~/styled-system/recipes'

export default function Home() {
	return (
		<main>
			<Title>Hello World</Title>

			<div class={stack({ p: '10' })}>
				<h1
					class={cx(
						css({ mb: '6' }),
						text({ variant: 'heading', size: '3xl' }),
					)}
				>
					Hello world!
				</h1>
			</div>

			<div
				class={cx(
					container({ py: '10' }),
					grid({
						gap: '4',
						gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
					}),
				)}
			>
				<a
					href='/api/ping'
					class={button({ variant: 'outline' })}
					target='_blank'
				>
					ping auth server
				</a>

				<a
					href='/oauth-login'
					class={button({ variant: 'outline' })}
				>
					oauth login
				</a>
				<a
					href='/phone-login'
					class={button({ variant: 'outline' })}
				>
					phone login
				</a>

				<a
					href='/user'
					class={button({ variant: 'outline' })}
				>
					user
				</a>

				<a
					href='/icons'
					class={button({ variant: 'outline' })}
				>
					icons render
				</a>
				<a
					href='/motion'
					class={button({ variant: 'outline' })}
				>
					motion
				</a>

				<a
					href='/data/p1'
					class={button({ variant: 'outline' })}
				>
					data provider
				</a>
			</div>
		</main>
	)
}
