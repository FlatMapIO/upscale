import { Show, batch, createSignal, onCleanup, onMount } from 'solid-js'
import { WebGLAvatar } from '~/components/hume/web-gl-avatar'

// @ts-ignore
export default function Page() {
	const [loaded, setLoaded] = createSignal(false)
	const [track, setTrack] = createSignal<{
		fft: number[]
		isPlaying: boolean
		prosody: Record<string, number>
	}>()

	onMount(async () => {
		// @ts-ignore
		const data = await import('~/components/hume/sample-data.js').then(it => it.default)
		batch(() => {
			setLoaded(true)
			setTrack(data[0])
		})

		let i = 1
		const t = setInterval(() => {
			setTrack(data[i++ % data.length])
		}, 100)

		onCleanup(() => {
			clearInterval(t)
		})
	})

	return (
		<div>
			<Show when={loaded()}>
				<WebGLAvatar
					fft={track().fft}
					isPlaying={track().isPlaying}
					prosody={track().prosody}
					width={400}
					height={200}
				/>
			</Show>
		</div>
	)
}
