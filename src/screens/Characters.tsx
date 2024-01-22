import { Grid, Tabs, useMantineTheme, Text, Image } from '@mantine/core'
import { content } from '@/styles'
import { useEffect, useState } from 'react'
import classes from '@/component/NavLink.module.css'
import placeholder from '@/assets/placeholder.svg'
import { charRoute } from '@/routes'

const horizontalTabs = [
	{ value: 'skill', color: 'red' },
	{ value: 'profile', color: 'blue' },
	{ value: 'lines', color: 'yellow' },
	{ value: 'attributes', color: 'green' },
	{ value: 'ability', color: 'cyan' },
] as const

const verticalTabs = ['1', '2', '3', '4', '5'] as const

export const Characters = () => {
	const theme = useMantineTheme()
	const [activeHorizontal, setActiveHorizontal] = useState<null | string>(
		horizontalTabs[0]['value']
	)
	const [activeVertical, setActiveVertical] = useState<null | string>(
		verticalTabs[0]
	)
	const { costume, name } = charRoute.useSearch()

	useEffect(() => {
		import(`../../characters/${name}.json`)
			.then(data => {})
			.catch(e => {
				console.error({ e }, 'import character')
			})
	}, [name])

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
						{verticalTabs.map(value => {
							return (
								<Tabs.Tab
									className={classes.navlink}
									value={value}
									fz="lg"
									key={value}
									style={{
										...(activeVertical === value
											? {
													backgroundColor: 'rgba(59,91,219, 0.5)',
												}
											: {}),
									}}
								>
									<Image
										radius="xl"
										h="48px"
										src="https://source.unsplash.com/user/c_v_r/100x100"
									/>
								</Tabs.Tab>
							)
						})}
					</Tabs.List>
				</Tabs>
			</Grid.Col>
			<Grid.Col
				span={'auto'}
				style={{
					...content,
					flexDirection: 'column',
					gap: theme.spacing.lg,
					position: 'relative',
				}}
				h="fit-content"
				mih={theme.breakpoints.sm}
				display="flex"
				p="md"
				mb="xl"
			>
				<Text ta="start" size="2rem">
					Justia
				</Text>
				<Tabs value={activeHorizontal} onChange={setActiveHorizontal}>
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
				</Tabs>
			</Grid.Col>
		</Grid>
	)
}
