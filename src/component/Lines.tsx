import { Text, Stack, Flex } from '@mantine/core'
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
						px="xs"
						pt="sm"
						pb="lg"
						justify="center"
						style={{
							borderRadius: theme.radius.md,
						}}
						gap={0}
					>
						<Text ta="left">{types[index]}:</Text>
						<Text size="xl" pt="xs" pb="md">
							{line}
						</Text>
						<Flex w="100%">
							{[
								'http://webaudioapi.com/samples/audio-tag/chrono.mp3',
								'http://webaudioapi.com/samples/audio-tag/chrono.mp3',
							].map(url => (
								<audio
									key={url}
									controls
									style={{
										paddingLeft: theme.spacing.xs,
										paddingRight: theme.spacing.xs,
										maxWidth: '50%',
										flexGrow: 1,
										height: '2em',
									}}
									controlsList="nodownload noplaybackrate noremoteplayback"
									preload="auto"
									src={url}
								/>
							))}
						</Flex>
					</Stack>
				)
			})}
		</Stack>
	)
}
