import { Text, Slider } from '@mantine/core'
import { useState } from 'react'
import { theme } from '@/theme'

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
		return '?'
	})
}

export const SkillTab = ({
	description,
	variables,
}: {
	description: string
	variables: Record<string, number[]>
}) => {
	const [value, setValue] = useState(0)
	const marks = Object.values(variables)[0] || []

	return (
		<>
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
