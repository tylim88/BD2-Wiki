import { Tabs, Stack } from '@mantine/core'
import { useState } from 'react'
import classes from '@/component/NavLink.module.css'
import { useRoutesStore } from '@/stores'
import { Link } from './Link'
import { charRoute } from '@/routes'

const tabs = [
	{ label: 'skill', color: 'red' },
	{ label: 'profile', color: 'blue' },
	{ label: 'lines', color: 'yellow' },
	{ label: 'attributes', color: 'green' },
	{ label: 'ability', color: 'cyan' },
] as const

export const CharacterInfoTabs = ({
	skill,
	profile,
	lines,
	attributes,
	ability,
}: {
	skill: React.ReactNode
	profile: React.ReactNode
	lines: React.ReactNode
	attributes: React.ReactNode
	ability: React.ReactNode
}) => {
	const { tab } = charRoute.useSearch()
	const [activeTab, setActiveTab] =
		useState<
			(typeof tabs extends readonly [...(infer P)[]] ? P : never)['label']
		>(tab)

	const storeParams = useRoutesStore(state => state.storeParams)

	return (
		<Tabs
			mt="lg"
			value={activeTab}
			// variant="pills"
			onChange={value => value && setActiveTab(value as typeof activeTab)}
		>
			<Tabs.List
				grow
				// style={{
				// 	borderColor: 'red',
				// 	border: 'solid',
				// 	borderWidth: '0 0 1px 0',
				// }}
			>
				{tabs.map(({ label, color }) => {
					return (
						<Link
							replace
							key={label}
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									tab: label,
								}
							}}
							style={{
								color: 'black',
							}}
							onClick={() => {
								storeParams({
									route: '/chars',
									params: {
										tab: label,
									},
								})
							}}
						>
							<Tabs.Tab
								className={classes.navlink}
								value={label}
								color={color}
								fz="lg"
								key={label}
								style={{
									textTransform: 'capitalize',
									...(activeTab === label
										? {
												backgroundColor: '#000',
												color: '#fff',
											}
										: {}),
								}}
								onClick={() => {
									storeParams({
										route: '/chars',
										params: {
											tab: label,
										},
									})
								}}
							>
								{label}
							</Tabs.Tab>
						</Link>
					)
				})}
			</Tabs.List>
			<Stack p="xl" align="center" gap="xl">
				{activeTab === 'skill' ? skill : null}
				{activeTab === 'profile' ? profile : null}
				{activeTab === 'lines' ? lines : null}
				{activeTab === 'attributes' ? attributes : null}
				{activeTab === 'ability' ? ability : null}
			</Stack>
		</Tabs>
	)
}
