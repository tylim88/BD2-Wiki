import { Tabs, Image } from '@mantine/core'
import { useEffect, useState } from 'react'
import classes from '@/component/NavLink.module.css'
import { charRoute } from '@/routes'
import book from '%/icons/costumes/book.png'
import { useRoutesStore } from '@/stores'
import { Link } from './Link'
import { toLowerCaseAndReplaceSpace } from '@/utils'
import { type Characters } from '@/validation'

export const CostumeTabs = ({ data }: { data: Characters }) => {
	const { costume } = charRoute.useSearch()
	const [activeTab, setActiveTab] = useState<string>(costume)
	const storeParams = useRoutesStore(state => state.storeParams)
	const [icons, setIcons] = useState<Record<string, string>>({})
	useEffect(() => {
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
				setIcons(
					result.reduce<Record<string, string>>((acc, res) => {
						if (res.status === 'fulfilled') {
							acc[toLowerCaseAndReplaceSpace(res.value.name)] = res.value.url
						}
						return acc
					}, {})
				)
			})
			.catch(e => {
				console.error({ e }, 'import icons')
			})
	}, [data.name, data.costumes])

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
				{data.costumes.map(({ name: name_ }) => {
					const name = toLowerCaseAndReplaceSpace(name_)
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
