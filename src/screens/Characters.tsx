import { Grid, Text, Image, Flex, Center, Loader, Badge } from '@mantine/core'
import { content } from '@/styles'
import placeholder from '@/assets/placeholder.svg'
import flower from '@/assets/flower.jpeg'
import { charRoute } from '@/routes'
import { Star } from '@mui/icons-material'
import {
	TabsCostume,
	TabsCharacterInfo,
	Skill,
	Profile,
	Lines,
	Attributes,
	Ability,
} from '@/component'
import { THEME } from '@/theme'
import {
	IconArrowUp,
	IconArrowDown,
	IconArrowLeft,
	IconArrowRight,
	IconArrowUpLeft,
	IconArrowUpRight,
	IconArrowDownLeft,
	IconArrowDownRight,
} from '@tabler/icons-react'
import { useFetchCharacterData, useFetchCostumeData } from '@/api'

const arrow = {
	up: IconArrowUp,
	down: IconArrowDown,
	left: IconArrowLeft,
	right: IconArrowRight,
	'up left': IconArrowUpLeft,
	'up right': IconArrowUpRight,
	'down left': IconArrowDownLeft,
	'down right': IconArrowDownRight,
}

export const Characters = () => {
	const { costume, name } = charRoute.useSearch()
	const { data: character } = useFetchCharacterData(name)
	const { data: selectedCostume } = useFetchCostumeData({ name, costume })

	if (!character || !selectedCostume) {
		return (
			<Center h="100%" w="100%">
				<Loader color="red" />
			</Center>
		)
	}
	const Arrow = arrow[character.kick]
	return (
		<Grid
			h="100%"
			w="100%"
			styles={{
				inner: { height: '100%' },
			}}
			pb="xl"
		>
			<Grid.Col span={6} pos="relative">
				<Image src={flower} h="80vh" fit="contain" fallbackSrc={placeholder} />
			</Grid.Col>
			<Grid.Col span={1}>
				<TabsCostume character={character} />
			</Grid.Col>
			<Grid.Col
				span="auto"
				style={{
					...content,
					borderRadius: THEME.radius.sm,
					flexDirection: 'column',
					position: 'relative',
				}}
				h="fit-content"
				display="flex"
				px="md"
				py="lg"
			>
				<Flex>
					{Array.from({ length: character.rarity }).map((_, index) => {
						return <Star key={index} />
					})}
					<Badge
						color={character.dmg_type === 'physical' ? 'red' : 'purple'}
						mx="xs"
					>
						{character.dmg_type}
					</Badge>
					<Text
						size="xl"
						tt="capitalize"
						ta="right"
						style={{
							flexGrow: 1,
						}}
					>
						{character.target}
					</Text>
					<Arrow size="2em" />
				</Flex>
				<Flex>
					<Image
						src={`/icons/elements/${character.element}.png`}
						h="3.5em"
						w="auto"
						fit="contain"
					/>
					<Text size="2em">{character.name}:</Text>
					<Text size="2em" fs="italic">
						{selectedCostume.name}
					</Text>
				</Flex>
				<TabsCharacterInfo
					skill={<Skill character={character} costume={selectedCostume} />}
					ability={<Ability character={character} />}
					profile={
						<Profile costume={selectedCostume} birthday={character.birthday} />
					}
					attributes={<Attributes character={character} />}
					lines={<Lines costume={selectedCostume} />}
					uniqueEquipment={undefined}
				/>
			</Grid.Col>
		</Grid>
	)
}
