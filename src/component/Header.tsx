import { Center, Grid, Flex, Image, TextInput, ActionIcon } from '@mantine/core'
import { Link } from './Link'
import brand from '@/assets/brand.svg'
import { IconSearch, IconBrandGithubFilled } from '@tabler/icons-react'
import { NavLink } from './NavLink'
import { useRoutesStore } from '@/stores'
import { glass } from '@/styles'
import {
	charRoute,
	tierRoute,
	bannersRoute,
	eventsRoute,
	packsRoute,
	itemsRoute,
} from '@/routes'
import { theme } from '@/theme'

export const Header = ({
	setRef,
}: {
	setRef: (r: HTMLDivElement | null) => void
}) => {
	const routes = useRoutesStore(state => state.routes)

	return (
		<Center
			py="sm"
			ref={r => {
				setRef(r)
			}}
			pos="fixed"
			top={0}
			style={{
				...glass,
				zIndex: 9999,
			}}
			w="100%"
		>
			<Grid maw={theme.breakpoints.xl} w="100%" align="center">
				<Grid.Col span="content">
					<Link to="/">
						<Image src={brand} h="2em" />
					</Link>
				</Grid.Col>
				<Grid.Col span="auto">
					<Flex w="100%">
						<Link
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									costume: routes[charRoute.fullPath].costume,
									name: routes[charRoute.fullPath].name,
									tab: routes[charRoute.fullPath].tab,
								}
							}}
						>
							<NavLink path={charRoute.fullPath} label="Characters" />
						</Link>
						<Link to={tierRoute.fullPath}>
							<NavLink path={tierRoute.fullPath} label="Tier List" />
						</Link>
						<Link to={bannersRoute.fullPath}>
							<NavLink path={bannersRoute.fullPath} label="Banners" />
						</Link>
						<Link to={eventsRoute.fullPath}>
							<NavLink path={eventsRoute.fullPath} label="Events" />
						</Link>
						<Link to={packsRoute.fullPath}>
							<NavLink path={packsRoute.fullPath} label="Packs" />
						</Link>
						<Link to={itemsRoute.fullPath}>
							<NavLink path={itemsRoute.fullPath} label="Packs" />
						</Link>
					</Flex>
				</Grid.Col>
				<Grid.Col span="content">
					<Flex gap="xs">
						<TextInput leftSection={<IconSearch />} placeholder="Search" />
						<ActionIcon
							component="a"
							href="https://github.com/tylim88/BD2-Wiki"
							target="_blank"
							variant="subtle"
							size="xl"
							aria-label="Gradient action icon"
							color="dark"
						>
							<IconBrandGithubFilled />
						</ActionIcon>
					</Flex>
				</Grid.Col>
			</Grid>
		</Center>
	)
}
