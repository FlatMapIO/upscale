
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'
import {spawnSync} from 'node:child_process'
import icons from '../../icons'

const iconset = new Set<string>(icons)

const re = />(.*)<\/svg>/

export function generator(cwd: string) {
	const iconsZipball = path.join(cwd, 'icons.zip')
	const iconsAssetsDir = path.join(cwd, 'icons')
	const iconIndex = path.join(cwd, 'src/index.tsx')

	async function downloadAsUnpackedAssets() {
		console.log('Downloading icons...')
		const url = 'https://api.github.com/repos/lucide-icons/lucide/releases'
		const data = await fetch(url).then((it) => it.json())
		const latest = data[0]
		const zipball_url = latest.assets.find((it) =>
			it.name.includes('lucide-icons'),
		).browser_download_url
		if (!zipball_url) {
			console.error(`Could not find zipball_url for ${url}`)
			process.exit(1)
		}
		console.log(`Downloading ${zipball_url}...`)
		const binary = await fetch(zipball_url).then((it) => it.arrayBuffer())

		const dl_file = fs.createWriteStream(iconsZipball)
		dl_file.write(binary)

		spawnSync(
			['unzip', '-o', '-d', cwd, iconsZipball].join(' '),
		)

		fs.rmSync(iconsZipball)
	}

	async function generate() {
		if (!fs.existsSync(iconsAssetsDir)) {
			await downloadAsUnpackedAssets()
		}

		const files = fs.readdirSync(iconsAssetsDir)

		const imports = `// @ts-nocheck
import type { LucideProps } from './types';
import { Icon } from './icon';`
		const components: string[] = []

		for (const file of files) {
			if (!file.endsWith('.svg')) continue

			const name = file.replace('.svg', '')
			if (!iconset.has(name)) continue

			const content = fs
				.readFileSync(path.join(iconsAssetsDir, file), 'utf8')
				.split('\n')
				.map((it) => it.trim())
				.join(' ')
			const matches = content.match(re)
			const nodes = matches?.at(1)
			if (!nodes) {
				console.error(`Could not parse ${file} content`)
				process.exit(1)
			}

			const code = `
export const ${titleName(
				name,
			)}Icon = (props: LucideProps) => (<Icon {...props} name='${name}'>${nodes}</Icon>);`
			components.push(code)
		}

		// generate index

		fs.writeFileSync(iconIndex, `${imports}\n\n${components.join('\n\n')}`)
	}

	function titleName(name: string) {
		return name
			.split('-')
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join('')
	}

	return generate
}

async function main() {
	// const iconsSet = new Set(icons)
	const s = path.join(process.cwd(), 'iconset.config.ts')
	const gen = generator(process.cwd())
	gen()
}

main()
