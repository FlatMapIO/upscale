import {
	createServerContextAccessor,
	type Bindings,
} from '@upscale/solid-start/server-context'

type Env = {
	// TODO: add types
}
export const getServerContext = createServerContextAccessor<Bindings & Env>()
