import { animate, spring } from 'motion'
import { For, createMemo, createSignal } from 'solid-js'
import { Motion } from 'solid-motionone'
import { css, cx } from '~/styled-system/css'
import { container, square, stack } from '~/styled-system/patterns'
export default function Page() {
	return (
		<div
			class={cx(
				container({ py: '20' }),
				stack({
					gap: '20',
				}),
			)}
		>
			<div
				style={{
					width: '100px',
					height: '100px',
					background: 'blue',
				}}
				ref={(el) => {
					animate(el, { rotate: 90 }, { easing: spring() })
				}}
			/>

			<div
				class={square({ size: '20', bg: 'red' })}
				ref={(el) => {
					animate(el, { scale: 2, opacity: 1 }, { easing: spring() })
				}}
			/>

			<div class={css({ py: '10' })}>
				<Duck />
			</div>
		</div>
	)
}

const Duck = () => {
	const [mouseX, setMouseX] = createSignal(Number.POSITIVE_INFINITY)

	return (
		<div
			class={css({
				ml: 'auto',
				mr: 'auto',
				display: 'flex',
				h: '58px',
				alignItems: 'flex-end',
				gap: '2',
				rounded: '2xl',
				p: '2',
				borderWidth: '1px',
				_dark: { borderColor: '#707070' },
			})}
			onMouseMove={(e) => {
				setMouseX(e.pageX)
			}}
			onMouseLeave={(e) => {
				setMouseX(Number.POSITIVE_INFINITY)
			}}
		>
			<For
				each={[
					'/dock/cal.png',
					'/dock/contacts.png',
					'/dock/discord.png',
					'/dock/finder.png',
					'/dock/github.png',
					'/dock/midday.png',
					'/dock/notion.png',
				]}
			>
				{(src) => (
					<AppIcon
						mouseX={mouseX()}
						src={src}
					/>
				)}
			</For>
		</div>
	)
}

const AppIcon = (props: {
	src: string
	mouseX: number
}) => {
	const [elementRef, setElementRef] = createSignal<HTMLElement>()

	const width = createMemo(() => {
		const el = elementRef()
		if (!el) return '40px'

		const bounds = el.getBoundingClientRect() ?? { x: 0, width: 0 }

		const distance = props.mouseX - bounds.x - bounds.width / 2

		const value =
			distance < -100
				? 40
				: distance > 100
					? 40
					: 55 - Math.abs(distance) * 0.15

		return `${value}px`
	})

	return (
		<Motion.img
			width={60}
			height={60}
			src={props.src}
			ref={setElementRef}
			animate={{
				width: width(),
			}}
			transition={{
				easing: spring({
					mass: 0.1,
					stiffness: 140,
					damping: 12,
				}),
			}}
		/>
	)
}
