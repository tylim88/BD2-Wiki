import { Grid, Text, Stack, TextProps, Slider } from '@mantine/core'
import { Characters } from '@/validation'
import { useCharactersStore } from '@/stores'
import { theme } from '@/theme'

const Component = ({
	label,
	value,
	textProps,
}: {
	label: string
	value: string
	textProps?: TextProps
}) => {
	return (
		<>
			<Grid align="center" w="100%">
				<Grid.Col
					span="auto"
					display="flex"
					style={{
						justifyContent: 'end',
						alignItems: 'center',
					}}
				>
					<Text ta="left" tt="capitalize" {...textProps}>
						{label}
					</Text>
				</Grid.Col>
				<Grid.Col
					span="auto"
					display="flex"
					style={{
						alignItems: 'center',
					}}
				>
					<Text ta="left" {...textProps}>
						{value}
					</Text>
				</Grid.Col>
			</Grid>
		</>
	)
}

const resistance = {
	fire: 'wind',
	wind: 'water',
	water: 'fire',
}

const maxLevel = 100
const minLevel = 1
const totalLevel = maxLevel - minLevel

export const Attributes = ({ character }: { character: Characters }) => {
	const level = useCharactersStore(
		state => state.slider.attributes[character.name] || 1
	)
	const totalHP =
		((character.attributes.hp.max - character.attributes.hp.min) / totalLevel) *
			level +
		character.attributes.hp.min
	const totalATK =
		((character.attributes.atk.max - character.attributes.atk.min) /
			totalLevel) *
			level +
		character.attributes.atk.min

	return (
		<Stack align="center" py="xl">
			<Component
				label="Level"
				value={`${level}`}
				textProps={{ size: 'xl', fw: 'bold' }}
			/>
			<Component
				label="HP"
				value={`${Math.ceil(totalHP)}`}
				textProps={{ fw: 'bold' }}
			/>
			<Component
				label={character.dmg_type === 'magic' ? 'Magic ATK' : 'ATK'}
				value={`${Math.ceil(totalATK)}`}
				textProps={{ fw: 'bold' }}
			/>
			<Component
				label={'Crit Rate'}
				value={`${character.attributes.crit_rate}%`}
			/>
			<Component
				label={'Crit DMG'}
				value={`${character.attributes.crit_dmg}%`}
			/>
			<Component label={'DEF'} value={`${character.attributes.def}%`} />
			<Component
				label={'Magic Resist'}
				value={`${character.attributes.magic_resist}%`}
			/>
			<Component
				label={`${character.element === 'dark' ? 'Darkness' : character.element} DMG`}
				value={`${character.attributes.dmg}%`}
			/>
			<Component
				label={`${character.element === 'dark' || character.element === 'light' ? 'Property' : resistance[character.element]} Resist`}
				value={`${character.attributes.dmg}%`}
			/>

			<Slider
				value={level}
				onChange={value => {
					useCharactersStore.setState(state => {
						state.slider.attributes[character.name] = value
					})
				}}
				color="blue"
				min={1}
				max={100}
				step={1}
				w="100%"
				miw="25em"
				p="xl"
				marks={[{ value: 1, label: <Text>1</Text> }].concat(
					Array.from({
						length: maxLevel / 20,
					}).map((_, index) => {
						return {
							value: (index + 1) * 20,
							label: <Text>{(index + 1) * 20}</Text>,
						}
					})
				)}
				styles={{
					markLabel: {
						color: 'black',
						fontSize: theme.fontSizes.xl,
						textAlign: 'center',
					},
				}}
			/>
		</Stack>
	)
}
