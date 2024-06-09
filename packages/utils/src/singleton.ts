export function createSingletonObject<T>(
	name: string,
	getter: () => T,
): () => T {
	const key = Symbol(name)
	return () => {
		let obj = (globalThis as any)[key]
		if (obj) return obj
		console.log('create global object', name)
		obj = getter()
		// @ts-ignore
		globalThis[key] = obj
		return obj
	}
}
