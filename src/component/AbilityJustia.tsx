import { Grid, Text, Stack, TextProps } from '@mantine/core'
import { Characters } from '@/validation'
import { useCharactersStore } from '@/stores'

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

export const AbilityJustia = ({ character }: { character: Characters }) => {
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
		<Stack align="center" gap={0} pt="xl">
			{/* <Flex w="100%">
				<Flex justify="center" style={{ flexGrow: 1 }}>
					<ActionIcon
						variant="transparent"
						style={{ flexGrow: 1 }}
						onClick={() => {
							if (level > 1) {
								useCharactersStore.setState(state => {
									state.slider.attributes[character.name] =
										(state.slider.attributes[character.name] || 0) - 1
								})
							}
						}}
					>
						<ArrowBackIosOutlined fontSize="large" htmlColor="black" />
					</ActionIcon>
				</Flex>
				<Stack style={{ flexGrow: 1 }}>
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
				</Stack>
				<Flex
					justify="center"
					style={{ flexGrow: 1 }}
					onClick={() => {
						if (level < 100) {
							useCharactersStore.setState(state => {
								state.slider.attributes[character.name] =
									(state.slider.attributes[character.name] || 0) + 1
							})
						}
					}}
				>
					<ActionIcon variant="transparent" disabled={level === 100}>
						<ArrowForwardIosOutlined fontSize="large" htmlColor="black" />
					</ActionIcon>
				</Flex>
			</Flex> */}
		</Stack>
	)
}
