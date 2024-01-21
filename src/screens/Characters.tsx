import { Grid, Tabs, useMantineTheme, Text } from '@mantine/core'
import { content } from '@/styles'
import { useState } from 'react'
import classes from '@/component/Header.module.css'

const left = 6

const horizontalTab = [
	{ value: 'skill', color: 'red' },
	{ value: 'profile', color: 'blue' },
	{ value: 'lines', color: 'yellow' },
	{ value: 'attributes', color: 'green' },
	{ value: 'ability', color: 'cyan' },
] as const

export const Characters = () => {
	const theme = useMantineTheme()
	const [activeHorizontal, setActiveHorizontal] = useState<null | string>(
		horizontalTab[0]['value']
	)
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
				style={{ ...content, flexDirection: 'column', gap: theme.spacing.lg }}
				h="fit-content"
				mih={theme.breakpoints.sm}
				display={'flex'}
				p="md"
				mb="xl"
			>
				<Text ta="start" size="2rem">
					Justia
				</Text>
				<Tabs value={activeHorizontal} onChange={setActiveHorizontal}>
					<Tabs.List grow>
						{horizontalTab.map(({ value, color }) => {
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
			</Grid.Col>
		</Grid>
	)
}
