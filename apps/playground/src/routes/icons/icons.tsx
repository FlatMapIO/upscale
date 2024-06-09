import {
	ArrowDownNarrowWideIcon,
	ArrowLeftRightIcon,
	ArrowUpWideNarrowIcon,
	BatteryChargingIcon,
	BookOpenIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
	CodeIcon,
	CopyIcon,
	FolderInputIcon,
	InfoIcon,
	LogOutIcon,
	MessageCircleMoreIcon,
	MessageSquareIcon,
	MinusIcon,
	PauseIcon,
	PlayIcon,
	PlusIcon,
	SettingsIcon,
	StarIcon,
	Trash2Icon,
	WandIcon,
	XIcon,
} from '@mono/lucide'
import { cx } from '~/styled-system/css'

import { container, grid } from '~/styled-system/patterns'

export default function Page() {
	return (
		<div
			class={cx(
				container(),
				grid({
					gap: '4',
					gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
				}),
			)}
		>
			<MessageCircleMoreIcon />
			<ChevronsUpDownIcon />
			<ChevronDownIcon />
			<ArrowUpWideNarrowIcon />
			<ChevronUpIcon />
			<XIcon />
			<ChevronRightIcon />
			<LogOutIcon />
			<SettingsIcon />
			<BookOpenIcon />
			<BatteryChargingIcon />
			<CodeIcon />
			<PlusIcon />
			<CheckIcon />
			<InfoIcon />
			<CopyIcon />
			<PlayIcon />
			<StarIcon />
			<MessageSquareIcon />
			<Trash2Icon />
			<WandIcon />
			<ArrowDownNarrowWideIcon />
			<FolderInputIcon />
			<PauseIcon />
			<ArrowLeftRightIcon />
			<MinusIcon />
			<ChevronLeftIcon />
		</div>
	)
}
