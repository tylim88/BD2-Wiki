import { Grid, Text, Stack } from '@mantine/core'
import { Characters } from '@/validation'
import { theme } from '@/theme'
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
						px="xl"
						pt="sm"
						pb="lg"
						justify="center"
						style={{
							borderRadius: theme.radius.md,
						}}
					>
						<Text size="xl">{line}</Text>
						<Grid align="center">
							<Grid.Col
								span={4}
								display="flex"
								style={{
									alignItems: 'center',
								}}
							>
								<Text ta="left">{types[index]}</Text>
							</Grid.Col>
							<Grid.Col
								span="auto"
								display="flex"
								style={{
									alignItems: 'center',
								}}
							>
								<audio
									controls
									style={{
										height: '2em',
									}}
									controlsList="nodownload noplaybackrate"
									preload="auto"
									src={'http://webaudioapi.com/samples/audio-tag/chrono.mp3'}
								/>
							</Grid.Col>
						</Grid>
					</Stack>
				)
			})}
		</Stack>
	)
}
