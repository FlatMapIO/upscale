import { css } from '~/styled-system/css'

export const MediaIndicator = () => {
	return (
		import.meta.env.DEV && (
			<div
				id='page-indicator'
				class={css({
					pos: 'fixed',
					bottom: '1',
					left: '1',
					zIndex: 1600,
					display: 'flex',
					h: '6',
					w: '6',
					alignItems: 'center',
					justifyContent: 'center',
					rounded: 'full',

					bg: 'fg.default',
					color: 'bg.default',

					p: '3',
					fontFamily: 'mono',
					fontSize: 'xs',
					lineHeight: 'xs',
				})}
			>
				<div class={css({ display: 'block', sm: { display: 'none' } })}>xs</div>
				<div
					class={css({
						display: 'none',
						smOnly: { display: 'block' },
					})}
				>
					sm
				</div>
				<div
					class={css({
						display: 'none',
						mdOnly: { display: 'block' },
					})}
				>
					md
				</div>
				<div
					class={css({
						display: 'none',
						lgOnly: { display: 'block' },
					})}
				>
					lg
				</div>
				<div
					class={css({
						display: 'none',
						xlOnly: { display: 'block' },
					})}
				>
					xl
				</div>
				<div class={css({ display: 'none', '2xl': { display: 'block' } })}>
					2xl
				</div>
			</div>
		)
	)
}
