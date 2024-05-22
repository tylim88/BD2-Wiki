import { Text, Stack, Flex } from '@mantine/core'
import { type Costumes } from '@/validation'
import { THEME } from '@/theme'

type I = Costumes['lines'] extends (infer R)[] ? R : never
type P = I & { label: `${Capitalize<I['type']>} ${number}` }

export const Lines = ({ costume }: { costume: Costumes }) => {
	const initial: P[] = []
	const lines = costume.lines.reduce<P[]>((acc, item, index) => {
		const createLine = (number: number) =>
			({
				...item,
				label: `${(item.type.charAt(0).toUpperCase() + item.type.slice(1)) as Capitalize<I['type']>} ${number}`,
			}) as const
		const previousItem = acc[index - 1]
		if (previousItem) {
			acc.push(
				createLine(
					previousItem.type === item.type
						? parseInt(previousItem.label.split(' ')[1] || '0')
						: 1
				)
			)
			return acc
		} else {
			acc.push(createLine(1))
			return acc
		}
	}, initial)
	return (
		<Stack pt="xl">
			{lines.map(line => {
				return (
					<Stack
						key={line.script}
						bg="rgba(250,250,250,0.5)"
						px="xs"
						pt="sm"
						pb="lg"
						justify="center"
						style={{
							borderRadius: THEME.radius.md,
						}}
						gap={0}
					>
						<Text ta="left">{line.label}:</Text>
						<Text size="xl" pt="xs" pb="lg">
							{line.script}
						</Text>
						<Flex w="100%">
							{['/audios/chrono.mp3', '/audios/chrono.mp3'].map(
								(url, index) => (
									<audio
										key={index}
										controls
										style={{
											paddingLeft: THEME.spacing.xs,
											paddingRight: THEME.spacing.xs,
											maxWidth: '50%',
											flexGrow: 1,
											height: '2em',
										}}
										controlsList="nodownload noplaybackrate noremoteplayback"
										preload="auto"
										src={url}
									/>
								)
							)}
						</Flex>
					</Stack>
				)
			})}
		</Stack>
	)
}
