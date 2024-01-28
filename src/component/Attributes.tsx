import { Grid, Text, Stack, Flex } from '@mantine/core'
import { Characters } from '@/validation'
import { useState } from 'react'
import { useCharactersStore } from '@/stores'

const Component = ({ label, value }: { label: string; value: string }) => {
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
					<Text ta="left" tt="capitalize">
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
					<Text ta="left">{value}</Text>
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

export const Attributes = ({ character }: { character: Characters }) => {
	const [hp, setHP] = useState(character.attributes.hp.min)
	const [atk, setATK] = useState(character.attributes.atk.min)
	const level = useCharactersStore(
		state => state.slider.attributes[character.name] || 1
	)

	return (
		<Stack pt="xl" align="center">
			<Flex w="100%">
				<Stack style={{ flexGrow: 1 }}>
					<Component label="HP" value={`${hp}`} />
					<Component
						label={character.dmg_type === 'magic' ? 'Magic ATK' : 'ATK'}
						value={`${atk}`}
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
			</Flex>
		</Stack>
	)
}
