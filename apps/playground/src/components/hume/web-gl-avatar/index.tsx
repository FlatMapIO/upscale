import { createEffect, createRenderEffect, onCleanup } from 'solid-js'
import { css, cx } from '~/styled-system/css'
import { AvatarState, AvatarVisualization } from './viz'
type EmotionScores = Record<string, number>
export type WebGLAvatarProps = {
	fft: number[]
	isPlaying: boolean
	prosody: EmotionScores
	width: number
	height: number

	class?: string
}

export const WebGLAvatar = (props: WebGLAvatarProps) => {
	const container = (el: HTMLDivElement) => {
		const viz = new AvatarVisualization({
			container: el,
			width: props.width,
			height: props.height,
		})

		queueMicrotask(() => {
			// delay starting animation until queue is empty
			viz.start()
		})

		createEffect(() => {
			const state = props.isPlaying ? AvatarState.BOUBA : AvatarState.LISTENING
			viz.startTransitionTo(state)
		})

		createEffect(() => {
			viz.updateFFT(props.fft)
		})

		createEffect(() => {
			viz.updateProsody(props.prosody)
		})
		createRenderEffect(() => {
			viz.resize(props.width, props.height)
		})

		onCleanup(() => {
			viz.destroy()
		})
	}

	return (
		<div
			class={cx(
				css({
					pointerEvents: 'none',
					pos: 'absolute',
					isolation: 'isolate',
				}),
				props.class,
			)}
			style={{ width: `${props.width}px`, height: `${props.height}px` }}
			ref={container}
		/>
	)
}
