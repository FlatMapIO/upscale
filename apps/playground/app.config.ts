import { defineConfig } from '@solidjs/start/config'

const isDev = process.argv.includes('dev')

export default defineConfig({
	middleware: './src/middleware.ts',
	server: {
		preset: 'cloudflare-module',
	},
})
