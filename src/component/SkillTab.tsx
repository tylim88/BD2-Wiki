import { Text, Slider, Flex, Box, Center } from '@mantine/core'
import { useState } from 'react'
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

const rangeColors = {
	light: { 1: '#A69038', 2: '#E0BF4C' },
	dark: { 1: '#7E4CBB', 2: '#BE7EFF' },
	fire: { 1: ' #C62828', 2: '#FF4241' },
	water: { 1: '#007ACC', 2: '#41BFFF' },
	wind: { 1: '#009966', 2: '#28D58E' },
} as const

export const SkillTab = ({
	description,
	variables,
	range,
	target,
	element,
}: {
	range: (0 | 1 | 2)[][]
	description: string
	variables: Record<string, number[]>
	target: Characters['costumes'][number]['skill']['target']
	element: Characters['element']
}) => {
	const [value, setValue] = useState(0)
	const marks = Object.values(variables)[0] || []

	const boxSize = 6

	return (
		<>
			<Flex align="center" justify="center" gap="xl">
				<Flex direction="column" justify="center" align="center" gap={0}>
					{range.map((item, i) => {
						return (
							<Flex justify="center" align="center" key={i} gap={0}>
								{item.map((num, j) => {
									const size = `${boxSize / 3}em`
									return (
										<Box
											bg={num ? rangeColors[element][num] : 'transparent'}
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
						c={rangeColors[element]['2']}
					>
						{target}
					</Text>
				</Center>
			</Flex>
			<Text ta="left" size="1.5em" mb="xl">
				{replaceComputedPlaceholders(
					replaceVariablePlaceholders(description, variables, value)
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
				mb="xl"
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
