import { Tabs } from '@mantine/core'
import { useState } from 'react'
import classes from '@/component/NavLink.module.css'
import { useRoutesStore } from '@/stores'
import { Link } from './Link'
import { charRoute } from '@/routes'

const tabs = [
	{ value: 'skill', label: null, color: 'red' },
	{ value: 'profile', label: null, color: 'blue' },
	{ value: 'lines', label: null, color: 'yellow' },
	{ value: 'attributes', label: null, color: 'green' },
	{ value: 'ability', label: null, color: 'cyan' },
	{ value: 'weapon', label: null, color: 'pink' },
] as const

export const TabsCharacterInfo = ({
	skill,
	profile,
	lines,
	attributes,
	ability,
	uniqueEquipment,
}: {
	skill: React.ReactNode
	profile: React.ReactNode
	lines: React.ReactNode
	attributes: React.ReactNode
	ability: React.ReactNode
	uniqueEquipment: React.ReactNode
}) => {
	const { tab } = charRoute.useSearch()
	const [activeTab, setActiveTab] =
		useState<
			(typeof tabs extends readonly [...(infer P)[]] ? P : never)['value']
		>(tab)

	const storeParams = useRoutesStore(state => state.storeParams)

	return (
		<Tabs
			mt="md"
			value={activeTab}
			onChange={value => value && setActiveTab(value as typeof activeTab)}
		>
			<Tabs.List grow>
				{tabs.map(({ value, color, label }) => {
					return (
						<Link
							replace
							key={value}
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									tab: value,
								}
							}}
							style={{
								color: 'black',
							}}
							onClick={() => {
								storeParams({
									route: '/chars',
									params: {
										tab: value,
									},
								})
							}}
						>
							<Tabs.Tab
								className={classes.navlink}
								value={value}
								color={color}
								fz="lg"
								key={value}
								tt="capitalize"
								style={{
									...(activeTab === value
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
											tab: value,
										},
									})
								}}
							>
								{label || value}
							</Tabs.Tab>
						</Link>
					)
				})}
			</Tabs.List>
			{activeTab === 'skill' ? skill : null}
			{activeTab === 'profile' ? profile : null}
			{activeTab === 'lines' ? lines : null}
			{activeTab === 'attributes' ? attributes : null}
			{activeTab === 'ability' ? ability : null}
			{activeTab === 'weapon' ? uniqueEquipment : null}
		</Tabs>
	)
}
