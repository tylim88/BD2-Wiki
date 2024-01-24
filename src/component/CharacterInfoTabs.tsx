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
	skillNode,
	profileNode,
	linesNode,
	attributesNode,
	abilityNode,
}: {
	skillNode: React.ReactNode
	profileNode: React.ReactNode
	linesNode: React.ReactNode
	attributesNode: React.ReactNode
	abilityNode: React.ReactNode
}) => {
	const [activeTab, setActiveTab] = useState<
		(typeof tabs extends readonly [...(infer P)[]] ? P : never)['label']
	>(tabs[0]['label'])

	const storeParams = useRoutesStore(state => state.storeParams)

	return (
		<Tabs
			mt="lg"
			value={activeTab}
			onChange={value => value && setActiveTab(value as typeof activeTab)}
		>
			<Tabs.List grow>
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
			<Stack>
				{activeTab === 'skill' ? skillNode : null}
				{activeTab === 'profile' ? profileNode : null}
				{activeTab === 'lines' ? linesNode : null}
				{activeTab === 'attributes' ? attributesNode : null}
				{activeTab === 'ability' ? abilityNode : null}
			</Stack>
		</Tabs>
	)
}
