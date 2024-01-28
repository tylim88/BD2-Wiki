import { Grid, Text, Image, Flex, Center, Loader, Badge } from '@mantine/core'
import { content } from '@/styles'
import { useEffect, useState } from 'react'
import placeholder from '@/assets/placeholder.svg'
import { charRoute } from '@/routes'
import { type Characters as Characters_ } from '@/validation'
import { Star } from '@mui/icons-material'
import {
	CostumeTabs,
	CharacterInfoTabs,
	SkillTab,
	Profile,
	Lines,
} from '@/component'
import { toLowerCaseAndReplaceSpace } from '@/utils'
import { theme } from '@/theme'
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
	const { costume: activeCostume, name } = charRoute.useSearch()
	const [data, setData] = useState<Characters_ | null>(null)
	const [elementURL, setElementURL] = useState<string | null>(null)

	useEffect(() => {
		import(`../../characters/${name.toLowerCase()}.ts`)
			.then(data_ => {
				const data = data_.default as Characters_
				setData(data)
				import(`../../icons/elements/${data.element}.png`)
					.then(module => {
						setElementURL(module.default as string)
					})
					.catch(e => {
						console.error({ e }, 'import element')
					})
			})
			.catch(e => {
				console.error({ e }, 'import character')
			})
	}, [name])

	const selectedCostume =
		data?.costumes.find(
			costume => toLowerCaseAndReplaceSpace(costume.name) === activeCostume
		) || data?.costumes[0]

	if (!data || !selectedCostume) {
		return (
			<Center h="100%" w="100%">
				<Loader color="red" />
			</Center>
		)
	}
	const Arrow = arrow[data.kick]

	return (
		<Grid
			h="100%"
			w="100%"
			styles={{
				inner: { height: '100%' },
			}}
		>
			<Grid.Col span={6} mb="xl" pos="relative">
				<Image
					src="https://source.unsplash.com/user/c_v_r/720x1080"
					h="80vh"
					fit="contain"
					fallbackSrc={placeholder}
				/>
			</Grid.Col>
			<Grid.Col span={1} mb="xl">
				<CostumeTabs data={data} />
			</Grid.Col>
			<Grid.Col
				span={'auto'}
				style={{
					...content,
					borderRadius: theme.radius.sm,
					flexDirection: 'column',
					position: 'relative',
				}}
				h="fit-content"
				display="flex"
				p="md"
				pb="xl"
				pt="xl"
				mb="xl"
			>
				<Flex>
					{Array.from({ length: data.rarity }).map((_, index) => {
						return <Star key={index} />
					})}
					<Badge
						color={data.dmg_type === 'physical' ? 'red' : 'purple'}
						mx="xs"
					>
						{data.dmg_type}
					</Badge>
					<Text
						size="xl"
						tt="capitalize"
						ta="right"
						style={{
							flexGrow: 1,
						}}
					>
						{data.target}
					</Text>
					<Arrow size="2em" />
				</Flex>
				<Flex>
					<Image src={elementURL} h="3.5em" w="auto" fit="contain" />
					<Text size="2em">{data.name}:</Text>
					<Text size="2em" fs="italic">
						{selectedCostume.name}
					</Text>
				</Flex>
				<CharacterInfoTabs
					skill={<SkillTab data={data} costume={selectedCostume} />}
					ability={undefined}
					profile={<Profile costume={selectedCostume} />}
					attributes={undefined}
					lines={<Lines costume={selectedCostume} />}
				/>
			</Grid.Col>
		</Grid>
	)
}
