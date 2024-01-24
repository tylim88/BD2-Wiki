import { Tabs, Image } from '@mantine/core'
import { useState } from 'react'
import classes from '@/component/NavLink.module.css'
import { charRoute } from '@/routes'
import book from '%/icons/costumes/book.png'
import { useRoutesStore } from '@/stores'
import { Link } from './Link'

export const CostumeTabs = ({
	names,
	icons,
	onChange,
}: {
	names: string[]
	icons: Record<string, string>
	onChange?: (value: string) => void
}) => {
	const { costume } = charRoute.useSearch()
	const [activeTab, setActiveTab] = useState<string>(costume)
	const storeParams = useRoutesStore(state => state.storeParams)
	return (
		<Tabs
			value={activeTab}
			onChange={value => {
				if (value) {
					setActiveTab(value)
					onChange && onChange(value)
				}
			}}
			orientation="vertical"
			variant="pills"
			style={{
				justifyContent: 'end',
			}}
		>
			<Tabs.List grow>
				{names.map(name => {
					return (
						<Link
							replace
							key={name}
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									costume: name,
								}
							}}
							onClick={() => {
								storeParams({
									route: '/chars',
									params: {
										costume: name,
									},
								})
							}}
						>
							<Tabs.Tab
								className={classes.navlink}
								value={name}
								fz="lg"
								h="6em"
								w="6em"
								style={{
									...(activeTab === name
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
								<Image p="xs" src={icons[name]} pos="static" />
							</Tabs.Tab>
						</Link>
					)
				})}
			</Tabs.List>
		</Tabs>
	)
}
