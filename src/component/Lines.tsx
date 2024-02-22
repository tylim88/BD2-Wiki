import { Text, Stack, Flex } from '@mantine/core'
import { Characters } from '@/validation'
import { THEME } from '@/theme'

const types = [
	'Battle Ready 1',
	'Battle Ready 2',
	'Battle Ready 3',
	'Battle Victory 1',
	'Battle Victory 2',
	'Battle Victory 3',
	'BattleS kill 1',
	'BattleS kill 2',
	'BattleS kill 3',
	'Talent Skill 1',
]

export const Lines = ({
	costume,
}: {
	costume: Characters['costumes'] extends (infer P)[] ? P : never
}) => {
	return (
		<Stack pt="xl">
			{costume.lines.map((line, index) => {
				return (
					<Stack
						key={line}
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
						<Text ta="left">{types[index]}:</Text>
						<Text size="xl" pt="xs" pb="lg">
							{line}
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
