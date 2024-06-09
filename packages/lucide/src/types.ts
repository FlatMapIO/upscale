import type { JSX } from 'solid-js/jsx-runtime'

type Props = {
	key?: string | number
	color?: string
	size?: string | number
	strokeWidth?: string | number
	class?: string
	absoluteStrokeWidth?: boolean
}

export type SVGAttributes = Omit<
	JSX.SvgSVGAttributes<SVGSVGElement>,
	'children' & keyof Props
>

export type LucideProps = SVGAttributes & Props
