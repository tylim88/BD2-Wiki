import { Tabs, Image } from '@mantine/core'
import { useState } from 'react'
import classes from '@/component/NavLink.module.css'
import { charRoute } from '@/routes'
import { useRoutesStore } from '@/stores'
import { Link } from './Link'
import { toLowerCaseReplaceSpaceRemoveSpecialChars } from '@/utils'
import { type Characters } from '@/validation'

export const TabsCostume = ({ character }: { character: Characters }) => {
	const { costume } = charRoute.useSearch()
	const [activeTab, setActiveTab] = useState<string>(costume)
	const storeParams = useRoutesStore(state => state.storeParams)

	return (
		<Tabs
			value={activeTab}
			onChange={value => {
				if (value) {
					setActiveTab(value)
				}
			}}
			orientation="vertical"
			variant="pills"
			style={{
				justifyContent: 'end',
			}}
		>
			<Tabs.List grow>
				{character.costumes.map(({ name }) => {
					const costumeName = toLowerCaseReplaceSpaceRemoveSpecialChars(name)
					return (
						<Link
							replace
							key={costumeName}
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									costume: costumeName,
								}
							}}
							onClick={() => {
								storeParams({
									route: '/chars',
									params: {
										costume: costumeName,
									},
								})
							}}
						>
							<Tabs.Tab
								className={classes.navlink}
								value={costumeName}
								fz="lg"
								h="6em"
								w="6em"
								style={{
									...(activeTab === costumeName
										? {
												background: 'transparent',
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
												backgroundPosition: 'center center',
												backgroundImage: `url(/icons/costumes/book.png)`,
											}
										: {}),
								}}
							>
								<Image
									p="xs"
									src={`/icons/costumes/${toLowerCaseReplaceSpaceRemoveSpecialChars(character.name)}/${toLowerCaseReplaceSpaceRemoveSpecialChars(costumeName)}.png`}
									pos="static"
								/>
							</Tabs.Tab>
						</Link>
					)
				})}
			</Tabs.List>
		</Tabs>
	)
}
