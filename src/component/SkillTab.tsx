import { Text, Slider, Flex, Box } from '@mantine/core'
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

export const SkillTab = ({
	description,
	variables,
	range,
	targets,
}: {
	range: (0 | 1 | 2)[][]
	description: string
	variables: Record<string, number[]>
	targets: Characters['costumes'][number]['skill']['targets']
}) => {
	const [value, setValue] = useState(0)
	const marks = Object.values(variables)[0] || []

	return (
		<>
			<Flex align="center" justify="center">
				<Flex direction="column" justify="center" align="center" gap={0}>
					{range.map((item, i) => {
						return (
							<Flex justify="center" align="center" key={i} gap={0}>
								{item.map((num, j) => {
									return (
										<Box
											key={j}
											h={'2em'}
											w={'2em'}
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
				w="80%"
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
