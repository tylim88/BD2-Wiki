import { Grid, Tabs, useMantineTheme, Text, Image } from '@mantine/core'
import { content } from '@/styles'
import { useState } from 'react'
import classes from '@/component/Header.module.css'

const left = 6

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
	const [offsetWidth, setOffsetWidth] = useState<number | null>(null)

	return (
		<Grid
			h="100%"
			w="100%"
			styles={{
				inner: { height: '100%' },
			}}
		>
			<Grid.Col span={left}></Grid.Col>
			<Grid.Col
				span={12 - left}
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
				my="xl"
			>
				<Text ta="start" size="2rem">
					Justia
				</Text>
				<Tabs value={activeHorizontal} onChange={setActiveHorizontal}>
					<Tabs.List grow>
						{horizontalTabs.map(({ value, color }) => {
							return (
								<Tabs.Tab
									className={classes.header}
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
				<Tabs
					value={activeVertical}
					onChange={setActiveVertical}
					orientation="vertical"
					variant="pills"
					pos="absolute"
					top={0}
					left={(offsetWidth || 0) * -1}
					ref={r => {
						r !== null && setOffsetWidth(r.offsetWidth)
					}}
				>
					<Tabs.List grow>
						{verticalTabs.map(value => {
							return (
								<Tabs.Tab
									className={classes.header}
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
		</Grid>
	)
}
