import { DEFAULT_THEME } from '@mantine/core'

export const glass = {
	background: 'rgba(197,170,106, 0.75)',
	boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
	backdropFilter: 'blur(30px)',
	border: '1px solid rgba(197,170,106, 0.3)',
} as const

export const content = {
	...glass,
	borderRadius: DEFAULT_THEME.radius.md,
} as const
