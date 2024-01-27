import { Text, Slider, Flex, Box, Center, Image } from '@mantine/core'
import { useState, useEffect } from 'react'
import { theme } from '@/theme'
import { Characters } from '@/validation'

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
	data,
	selectedCostume,
}: {
	data: Characters
	selectedCostume: Characters['costumes'] extends (infer P)[] ? P : never
}) => {
	const [value, setValue] = useState(0)
	const marks = Object.values(selectedCostume.skill.variables)[0] || []
	const [icon, setIcon] = useState<string | null>(null)

	useEffect(() => {
		import(
			`../../icons/skills/${data.name.toLowerCase()}/${removeSpecialCharAndReplaceSpace(selectedCostume.skill.name)}.png`
		)
			.then(module => {
				setIcon(module.default as string)
			})
			.catch(e => {
				console.error({ e }, 'skill icon')
			})
	}, [data.name, selectedCostume.skill.name])

	return (
		<>
			<Flex justify="start" w="100%">
				<Image src={icon} h="3.5em" />
				<Text ta="left" size="2em" fs="italic">
					{selectedCostume.skill.name}
				</Text>
			</Flex>
			<Flex justify="center" gap="xl">
				<Flex direction="column" justify="center" gap={0}>
					{selectedCostume.skill.range.map((item, i) => {
						return (
							<Flex justify="center" key={i} gap={0}>
								{item.map((num, j) => {
									const size = `${boxSize / 3}em`
									return (
										<Box
											bg={num ? rangeColors[data.element][num] : 'transparent'}
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
						c={rangeColors[data.element]['2']}
					>
						{selectedCostume.skill.target}
					</Text>
				</Center>
			</Flex>
			<Text ta="left" size="1.5em" mb="xl">
				{replaceComputedPlaceholders(
					replaceVariablePlaceholders(
						selectedCostume.skill.description,
						selectedCostume.skill.variables,
						value
					)
				)}
			</Text>
			<Slider
				value={value}
				onChange={setValue}
				color="blue"
				min={0}
				max={marks.length - 1}
				step={1}
				w="auto"
				miw="20em"
				marks={Array.from({
					length: marks.length || 0,
				}).map((_, index) => ({
					value: index,
					label: `+${index}`,
				}))}
				styles={{
					markLabel: {
						color: 'black',
						fontSize: theme.fontSizes.xl,
						textAlign: 'center',
					},
				}}
			/>
		</>
	)
}
