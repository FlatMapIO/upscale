import type {
	AssistantTranscriptMessage,
	ChatMetadataMessage,
	JSONErrorMessage,
	JSONMessage,
	SessionSettings,
	ToolCall,
	ToolError,
	ToolResponse,
	UserInterruptionMessage,
	UserTranscriptMessage,
	VoiceClient,
	VoiceEventMap,
} from '@humeai/voice'

export type ConnectionMessage =
	| {
			type: 'socket_connected'
			receivedAt: Date
	  }
	| {
			type: 'socket_disconnected'
			receivedAt: Date
	  }
type VoiceStatus =
	| {
			value: 'disconnected' | 'connecting' | 'connected'
			reason?: never
	  }
	| {
			value: 'error'
			reason: string
	  }
type VoiceError =
	| { type: 'socket_error'; message: string; error?: Error }
	| { type: 'audio_error'; message: string; error?: Error }
	| { type: 'mic_error'; message: string; error?: Error }
export enum VoiceReadyState {
	IDLE = 'idle',
	CONNECTING = 'connecting',
	OPEN = 'open',
	CLOSED = 'closed',
}

export type VoiceContextType = {
	connect: () => Promise<void>
	disconnect: () => void
	fft: number[]
	isMuted: boolean
	isPlaying: boolean
	messages: (
		| UserTranscriptMessage
		| AssistantTranscriptMessage
		| ConnectionMessage
		| UserInterruptionMessage
		| JSONErrorMessage
		| ToolCall
		| ToolResponse
		| ToolError
		| ChatMetadataMessage
	)[]
	lastVoiceMessage: AssistantTranscriptMessage | null
	lastUserMessage: UserTranscriptMessage | null
	clearMessages: () => void
	mute: () => void
	unmute: () => void
	readyState: VoiceReadyState
	sendUserInput: VoiceClient['sendUserInput']
	sendAssistantInput: VoiceClient['sendAssistantInput']
	sendSessionSettings: VoiceClient['sendSessionSettings']
	sendToolMessage: VoiceClient['sendToolMessage']
	status: VoiceStatus
	micFft: number[]
	error: VoiceError | null
	isAudioError: boolean
	isError: boolean
	isMicrophoneError: boolean
	isSocketError: boolean
	callDurationTimestamp: string | null
	toolStatusStore: Record<
		string,
		{ call?: ToolCall; resolved?: ToolResponse | ToolError }
	>
}
export type ToolCallHandler = (
	message: ToolCall,
	send: {
		success: (content: unknown) => ToolResponse
		error: (e: {
			error: string
			code: string
			level: string
			content: string
		}) => ToolError
	},
) => Promise<ToolResponse | ToolError>

export type VoiceProviderProps = {
	// Parameters<typeof createSocketConfig>[0]
	sessionSettings?: SessionSettings
	onMessage?: (message: JSONMessage) => void
	onError?: (err: VoiceError) => void
	onOpen?: () => void
	onClose?: VoiceEventMap['close']
	onToolCall?: ToolCallHandler
	/**
	 * @default true
	 * @description Clear messages when the voice is disconnected.
	 */
	clearMessagesOnDisconnect?: boolean
	/**
	 * @default 100
	 * @description The maximum number of messages to keep in memory.
	 */
	messageHistoryLimit?: number
}
