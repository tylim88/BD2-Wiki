import {
	Grid,
	useMantineTheme,
	Text,
	Image,
	Flex,
	Center,
	Loader,
} from '@mantine/core'
import { content } from '@/styles'
import { useEffect, useState } from 'react'
import placeholder from '@/assets/placeholder.svg'
import { charRoute } from '@/routes'
import { type Characters as Characters_ } from '@/validation'
import { Star } from '@mui/icons-material'
import { CostumeTabs, CharacterInfoTabs } from '@/component'
import { toLowerCaseAndReplaceSpace } from '@/utils'

export const Characters = () => {
	const { costume, name } = charRoute.useSearch()
	const theme = useMantineTheme()
	const [activeCostume, setActiveCostume] = useState<string>(`${costume}`)
	const [data, setData] = useState<Characters_ | null>(null)
	const [costumeIcons, setCostumeIcons] = useState<Record<string, string>>({})

	useEffect(() => {
		import(`../../characters/${name.toLowerCase()}.ts`)
			.then(data => {
				setData(data.default as Characters_)
			})
			.catch(e => {
				console.error({ e }, 'import character')
			})
	}, [name])

	useEffect(() => {
		if (data) {
			Promise.allSettled(
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
					console.error({ e })
				})
		}
	}, [data])

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
					defaultValue={costume}
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
				mih={theme.breakpoints.sm}
				display="flex"
				p="md"
				mb="xl"
			>
				<Flex>
					{Array.from({ length: data.rarity }).map((_, index) => {
						return <Star key={index} />
					})}
				</Flex>
				<Flex gap="sm">
					<Text size="2em">{data.name}:</Text>
					<Text size="2em" fs="italic">
						{selectedCostume.name}
					</Text>
				</Flex>
				<CharacterInfoTabs
					skillNode={undefined}
					abilityNode={undefined}
					profileNode={undefined}
					attributesNode={undefined}
					linesNode={undefined}
				/>
			</Grid.Col>
		</Grid>
	)
}
