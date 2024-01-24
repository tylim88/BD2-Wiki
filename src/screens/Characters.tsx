import {
	Grid,
	Tabs,
	useMantineTheme,
	Text,
	Image,
	Flex,
	Stack,
} from '@mantine/core'
import { content } from '@/styles'
import { useEffect, useState } from 'react'
import classes from '@/component/NavLink.module.css'
import placeholder from '@/assets/placeholder.svg'
import { charRoute } from '@/routes'
import { type Characters as Characters_ } from '@/validation'
import book from '%/icons/costumes/book.png'
import { Star } from '@mui/icons-material'
import { useRoutesStore } from '@/stores'
import { Link } from '@/component'
import { toLowerCaseAndReplaceSpace } from '@/utils'

const horizontalTabs = [
	{ value: 'skill', color: 'red' },
	{ value: 'profile', color: 'blue' },
	{ value: 'lines', color: 'yellow' },
	{ value: 'attributes', color: 'green' },
	{ value: 'ability', color: 'cyan' },
] as const

export const Characters = () => {
	const { costume, name } = charRoute.useSearch()
	const theme = useMantineTheme()
	const [activeHorizontal, setActiveHorizontal] = useState<
		| null
		| (typeof horizontalTabs extends readonly [...(infer P)[]]
				? P
				: never)['value']
	>(horizontalTabs[0]['value'])
	const [activeVertical, setActiveVertical] = useState<string | null>(
		`${costume}`
	)
	const [data, setData] = useState<Characters_ | null>(null)
	const [costumeIcons, setCostumeIcons] = useState<Record<string, string>>({})
	const storeParams = useRoutesStore(state => state.storeParams)

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
				<Tabs
					value={activeVertical}
					onChange={setActiveVertical}
					orientation="vertical"
					variant="pills"
					style={{
						justifyContent: 'end',
					}}
				>
					<Tabs.List grow>
						{(data?.costumes || []).map(({ name }) => {
							const costume = toLowerCaseAndReplaceSpace(name)
							return (
								<Link
									replace
									key={costume}
									from={charRoute.fullPath}
									search={prev => {
										return {
											...prev,
											costume,
										}
									}}
									onClick={() => {
										data &&
											storeParams({
												route: '/chars',
												params: {
													costume,
													name: toLowerCaseAndReplaceSpace(data.name),
													tab: activeHorizontal || 'skill',
												},
											})
									}}
								>
									<Tabs.Tab
										className={classes.navlink}
										value={costume}
										fz="lg"
										h="6em"
										w="6em"
										style={{
											...(activeVertical === costume
												? {
														background: 'transparent',
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
														backgroundPosition: 'center center',
														backgroundImage: `url(${book})`,
													}
												: {}),
										}}
									>
										<Image p="xs" src={costumeIcons[costume]} pos="static" />
									</Tabs.Tab>
								</Link>
							)
						})}
					</Tabs.List>
				</Tabs>
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
					{Array.from({ length: data?.rarity || 0 }).map((_, index) => {
						return <Star key={index} />
					})}
				</Flex>
				<Flex gap="sm">
					<Text size="2em">{data?.name}:</Text>
					<Text size="2em" fs="italic">
						{data?.costumes[parseInt(activeVertical || '-1')]?.name}
					</Text>
				</Flex>
				<Tabs
					mt="lg"
					value={activeHorizontal}
					// @ts-expect-error ...
					onChange={setActiveHorizontal}
				>
					<Tabs.List grow>
						{horizontalTabs.map(({ value, color }) => {
							return (
								<Tabs.Tab
									className={classes.navlink}
									value={value}
									color={color}
									fz="lg"
									key={value}
									style={{
										textTransform: 'capitalize',
										...(activeHorizontal === value
											? {
													backgroundColor: '#000',
													color: '#fff',
												}
											: {}),
									}}
								>
									{value}
								</Tabs.Tab>
							)
						})}
					</Tabs.List>
					<Stack>
						{activeHorizontal === 'skill' ? <Text></Text> : null}
						{activeHorizontal === 'profile' ? <></> : null}
						{activeHorizontal === 'lines' ? <></> : null}
						{activeHorizontal === 'attributes' ? <></> : null}
						{activeHorizontal === 'ability' ? <></> : null}
					</Stack>
				</Tabs>
			</Grid.Col>
		</Grid>
	)
}
