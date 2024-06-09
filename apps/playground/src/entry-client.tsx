// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'

mount(
	() => <StartClient />,
	// @ts-ignore
	document.getElementById('app')!,
)
