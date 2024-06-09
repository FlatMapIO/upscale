import { cache, createAsync } from '@solidjs/router'
import { createContext, useContext, type Accessor, type JSX } from 'solid-js'

export const getData$ = cache(async () => {
	'use server'

	await new Promise((r) => setTimeout(r, 3000))
	return {
		hello: 'world',
	}
}, 'getData')

// const [DataProvider, useData] = createContextProvider(() => {
// 	const u = createAsync(() => getData$())

// 	return u
// })

const Context = createContext<Accessor<any>>()

const DataProvider = (props: { children: JSX.Element }) => {
	const u = createAsync(() => getData$())
	return <Context.Provider value={u}>{props.children}</Context.Provider>
}

const useData = () => useContext(Context)!

export { DataProvider, useData }
