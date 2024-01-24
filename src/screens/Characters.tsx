import { Grid, Text, Image, Flex, Center, Loader, Badge } from '@mantine/core'
import { content } from '@/styles'
import { useEffect, useState } from 'react'
import placeholder from '@/assets/placeholder.svg'
import { charRoute } from '@/routes'
import { type Characters as Characters_ } from '@/validation'
import { Star } from '@mui/icons-material'
import { CostumeTabs, CharacterInfoTabs, SkillTab } from '@/component'
import { toLowerCaseAndReplaceSpace } from '@/utils'
import { theme } from '@/theme'

export const Characters = () => {
	const { costume, name } = charRoute.useSearch()
	const [activeCostume, setActiveCostume] = useState<string>(`${costume}`)
	const [data, setData] = useState<Characters_ | null>(null)
	const [costumeIcons, setCostumeIcons] = useState<Record<string, string>>({})
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
				return Promise.allSettled(
					data.costumes.map(async ({ name }) => {
						return {
							url: (
								await import(
									`../../icons/costumes/${toLowerCaseAndReplaceSpace(data.name)}/${toLowerCaseAndReplaceSpace(name)}.png`
								)
							).default as string,
							name,
						}
					})
				)
			})
			.then(result => {
				setCostumeIcons(
					result.reduce<Record<string, string>>((acc, res) => {
						if (res.status === 'fulfilled') {
							acc[toLowerCaseAndReplaceSpace(res.value.name)] = res.value.url
						}
						return acc
					}, {})
				)
			})
			.catch(e => {
				console.error({ e }, 'import character')
			})
	}, [name])

	const selectedCostume =
		data?.costumes.find(
			costume => toLowerCaseAndReplaceSpace(costume.name) === activeCostume
		) || data?.costumes[0]

	if (!data || !activeCostume || !selectedCostume) {
		return (
			<Center h="100%" w="100%">
				<Loader color="red" />
			</Center>
		)
	}

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
				<CostumeTabs
					onChange={setActiveCostume}
					names={data.costumes.map(({ name }) =>
						toLowerCaseAndReplaceSpace(name)
					)}
					icons={costumeIcons}
				/>
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
				mb="xl"
			>
				<Flex align="center">
					{Array.from({ length: data.rarity }).map((_, index) => {
						return <Star key={index} />
					})}
					<Badge
						color={data.dmg_type === 'physical' ? 'red' : 'purple'}
						ml="xs"
					>
						{data.dmg_type}
					</Badge>
				</Flex>
				<Flex align="center">
					<Image src={elementURL} h={50} w="auto" fit="contain" />
					<Text size="2em">{data.name}:</Text>
					<Text size="2em" fs="italic">
						{selectedCostume.name}
					</Text>
				</Flex>
				<CharacterInfoTabs
					skill={
						<SkillTab
							description={selectedCostume.skill.description}
							variables={selectedCostume.skill.variables}
						/>
					}
					ability={undefined}
					profile={undefined}
					attributes={undefined}
					lines={undefined}
				/>
			</Grid.Col>
		</Grid>
	)
}
