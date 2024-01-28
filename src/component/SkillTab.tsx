import { Text, Slider, Flex, Box, Center, Image, Stack } from '@mantine/core'
import { useState, useEffect } from 'react'
import { theme } from '@/theme'
import { Characters } from '@/validation'
import { useCharactersStore } from '@/stores'
import upgrade1 from '%/icons/skills/upgrade_1.png'
import upgrade2 from '%/icons/skills/upgrade_2.png'
import upgrade3 from '%/icons/skills/upgrade_3.png'
import upgrade4 from '%/icons/skills/upgrade_4.png'
import upgrade5 from '%/icons/skills/upgrade_5.png'

const upgradeIcons: Record<string, string> = {
	1: upgrade1,
	2: upgrade2,
	3: upgrade3,
	4: upgrade4,
	5: upgrade5,
}

const replaceVariablePlaceholders = (
	inputString: string,
	replacements: Record<string, number[]>,
	index: number
) => {
	return inputString.replace(/\{\{([^}]+)\}\}/g, (_, placeholder) => {
		return `${replacements[placeholder]?.[index]}` || 'error'
	})
}

const replaceComputedPlaceholders = (inputString: string) => {
	return inputString.replace(/<<([^>>]+)>>/g, () => {
		return ' ? '
	})
}

const removeSpecialCharAndReplaceSpace = (inputString: string) => {
	return inputString
		.replace(/[^\w\s]/gi, '')
		.replace(/\s+/g, '_')
		.toLowerCase()
}

const rangeColors = {
	light: { 1: '#A69038', 2: '#E0BF4C' },
	dark: { 1: '#7E4CBB', 2: '#BE7EFF' },
	fire: { 1: ' #C62828', 2: '#FF4241' },
	water: { 1: '#007ACC', 2: '#41BFFF' },
	wind: { 1: '#009966', 2: '#28D58E' },
} as const
const boxSize = 6

export const SkillTab = ({
	character,
	costume,
}: {
	character: Characters
	costume: Characters['costumes'] extends (infer P)[] ? P : never
}) => {
	const upgrade = useCharactersStore(
		state => state.slider.skill[costume.name] || 0
	)
	const marks = Object.values(costume.skill.variables)[0] || []
	const [icon, setIcon] = useState<string | null>(null)

	useEffect(() => {
		import(
			`../../icons/skills/${character.name.toLowerCase()}/${removeSpecialCharAndReplaceSpace(costume.skill.name)}.png`
		)
			.then(module => {
				setIcon(module.default as string)
			})
			.catch(e => {
				console.error({ e }, 'skill icon')
			})
	}, [character.name, costume.skill.name])

	return (
		<Stack p="xs" pt="lg" pb="xl" align="center" gap="xl">
			<Flex justify="start" w="100%" gap="xs">
				<Image src={icon} h="3.5em" />
				<Text ta="left" size="2em" fs="italic">
					{costume.skill.name}
				</Text>

				<Image src={upgradeIcons[upgrade]} h="3.5em" w="3.5em" />
			</Flex>
			<Flex justify="center" gap="xl">
				<Flex direction="column" justify="center" gap={0}>
					{costume.skill.range.map((item, i) => {
						return (
							<Flex justify="center" key={i} gap={0}>
								{item.map((num, j) => {
									const size = `${boxSize / 3}em`
									return (
										<Box
											bg={
												num
													? rangeColors[character.element][num]
													: 'transparent'
											}
											key={j}
											h={size}
											w={size}
											style={{
												border: 'solid',
												borderWidth: '2px',
											}}
										/>
									)
								})}
							</Flex>
						)
					})}
				</Flex>
				<Center
					style={{
						border: 'solid',
					}}
					bg="black"
					h={`${boxSize}em`}
					w={`${boxSize}em`}
				>
					<Text
						ta="center"
						lineClamp={2}
						tt="capitalize"
						fw="bold"
						size="xl"
						c={rangeColors[character.element]['2']}
					>
						{costume.skill.target}
					</Text>
				</Center>
			</Flex>
			<>
				<Text ta="left" size="1.5em" px="xl">
					{replaceComputedPlaceholders(
						replaceVariablePlaceholders(
							costume.skill.description,
							costume.skill.variables,
							upgrade
						)
					)}
				</Text>
				<Slider
					value={upgrade}
					onChange={value => {
						useCharactersStore.setState(state => {
							state.slider.skill[costume.name] = value
						})
					}}
					color="blue"
					min={0}
					max={marks.length - 1}
					step={1}
					w="auto"
					miw="20em"
					py="xl"
					marks={Array.from({
						length: marks.length || 0,
					}).map((_, index) => {
						return {
							value: index,
							label: <Text size="xl">{`+${index}`}</Text>,
						}
					})}
					styles={{
						markLabel: {
							color: 'black',
							fontSize: theme.fontSizes.xl,
							textAlign: 'center',
						},
					}}
				/>
			</>
		</Stack>
	)
}
