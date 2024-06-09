import { base64ToBlob, type AudioOutputMessage } from '@humeai/voice'
import { createEmitter } from '@solid-primitives/event-bus'
import { onCleanup, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { convertLinearFrequenciesToBark, generateEmptyFft } from './utils.js'
type Props = {
	onError: (message: string) => void
	onPlayAudio: (id: string) => void
}

export function createSoundPlayer(props: Props) {
	const [state, setState] = createStore({
		isPlaying: false,
		fft: generateEmptyFft(),
	})

	const api = createEmitter<{
		addToQueue: [AudioOutputMessage]
		stopAll: []
		clearQueue: []
	}>()
	onMount(() => {
		const audioContext = new AudioContext()
		const analyser = audioContext.createAnalyser()
		analyser.fftSize = 2048 // Must be a power of 2
		analyser.connect(audioContext.destination)

		let currentlyPlayingAudioBuffer: AudioBufferSourceNode | null = null
		let frequencyDataIntervalId: number | null = null
		let clipQueue: { id: string; buffer: AudioBuffer }[] = []
		let isProcessing = false

		const playNextClip = () => {
			if (!analyser || !audioContext) {
				props.onError('Audio environment is not initialized')
				return
			}

			if (clipQueue.length === 0 || isProcessing) {
				return
			}

			const nextClip = clipQueue.shift()
			if (!nextClip) return

			isProcessing = true
			setState((prev) => ({ ...prev, isPlaying: true }))

			const bufferSource = audioContext.createBufferSource()
			bufferSource.buffer = nextClip.buffer
			bufferSource.connect(analyser)
			currentlyPlayingAudioBuffer = bufferSource

			const updateFrequencyData = () => {
				try {
					const bufferSampleRate = bufferSource.buffer?.sampleRate
					if (!analyser || typeof bufferSampleRate === 'undefined') return

					const dataArray = new Uint8Array(analyser.frequencyBinCount)
					analyser.getByteFrequencyData(dataArray)

					const barkFrequencies = convertLinearFrequenciesToBark(
						dataArray,
						bufferSampleRate,
					)
					setState((prev) => ({ ...prev, fft: barkFrequencies }))
				} catch (e) {
					setState((prev) => ({ ...prev, fft: generateEmptyFft() }))
				}
			}

			frequencyDataIntervalId = window.setInterval(updateFrequencyData, 5)
			bufferSource.start(0)
			props.onPlayAudio(nextClip.id)

			bufferSource.onended = () => {
				if (frequencyDataIntervalId) {
					clearInterval(frequencyDataIntervalId)
				}
				setState((prev) => ({
					...prev,
					fft: generateEmptyFft(),
					isPlaying: false,
				}))
				currentlyPlayingAudioBuffer = null
				isProcessing = false
				playNextClip()
			}
		}

		const addToQueue = async (message: AudioOutputMessage) => {
			try {
				const blob = base64ToBlob(message.data, 'audio/mp3')
				const arrayBuffer = await blob.arrayBuffer()
				const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

				clipQueue.push({
					id: message.id,
					buffer: audioBuffer,
				})

				if (clipQueue.length === 1) {
					playNextClip()
				}
			} catch (e) {
				const eMessage = e instanceof Error ? e.message : 'Unknown error'
				props.onError(`Failed to add clip to queue: ${eMessage}`)
			}
		}

		const stopAll = () => {
			if (currentlyPlayingAudioBuffer) {
				currentlyPlayingAudioBuffer.stop()
				currentlyPlayingAudioBuffer = null
			}

			if (frequencyDataIntervalId) {
				clearInterval(frequencyDataIntervalId)
			}

			analyser.disconnect()

			if (audioContext) {
				audioContext.close().catch(() => {})
			}

			clipQueue = []
			isProcessing = false
			setState((prev) => ({
				fft: generateEmptyFft(),
				isPlaying: false,
			}))
		}

		const clearQueue = () => {
			if (currentlyPlayingAudioBuffer) {
				currentlyPlayingAudioBuffer.stop()
				currentlyPlayingAudioBuffer = null
			}

			clipQueue = []
			isProcessing = false
			setState((prev) => ({
				fft: generateEmptyFft(),
				isPlaying: false,
			}))
		}

		// Expose the functions to the outside

		api.on('addToQueue', (args) => addToQueue(...args))
		api.on('stopAll', stopAll)
		api.on('clearQueue', clearQueue)
	})

	onCleanup(() => {
		api.emit('stopAll', [])
		api.clear()
	})

	return {
		state,
		emit: api.emit,
	}
}
