import { Center, Grid, Flex, Image, TextInput, ActionIcon } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import brand from '@/assets/brand.svg'
import { IconSearch, IconBrandGithubFilled } from '@tabler/icons-react'
import { NavLink } from './NavLink'
import { useRoutesStore } from '@/stores'
import { glass } from '@/styles'
import {
	homeRoute,
	charRoute,
	tierRoute,
	bannersRoute,
	eventsRoute,
	packsRoute,
	itemsRoute,
} from '@/routes'

const LinkStyle = {
	textDecoration: 'none',
}

export const Header = ({ invisible }: { invisible?: boolean }) => {
	const theme = useMantineTheme()
	const routes = useRoutesStore(state => state.routes)

	return (
		<Center
			py="sm"
			style={{
				...glass,
				...(invisible
					? { visibility: 'hidden' }
					: { position: 'fixed', top: 0, zIndex: 9999 }),
			}}
			w="100%"
		>
			<Grid maw={theme.breakpoints.xl} w="100%" align="center">
				<Grid.Col span="content">
					<Link to="/">
						<Image src={brand} h="2rem" />
					</Link>
				</Grid.Col>
				<Grid.Col span="auto">
					<Flex w="100%" align="center">
						<Link to={homeRoute.fullPath} style={LinkStyle}>
							<NavLink path={homeRoute.fullPath} label="Home" />
						</Link>
						<Link
							from={charRoute.fullPath}
							search={prev => {
								return {
									...prev,
									costume: routes[charRoute.fullPath].costume,
									name: routes[charRoute.fullPath].name,
								}
							}}
							style={LinkStyle}
						>
							<NavLink path={charRoute.fullPath} label="Characters" />
						</Link>
						<Link to={tierRoute.fullPath} style={LinkStyle}>
							<NavLink path={tierRoute.fullPath} label="Tier List" />
						</Link>
						<Link to={bannersRoute.fullPath} style={LinkStyle}>
							<NavLink path={bannersRoute.fullPath} label="Banners" />
						</Link>
						<Link to={eventsRoute.fullPath} style={LinkStyle}>
							<NavLink path={eventsRoute.fullPath} label="Events" />
						</Link>
						<Link to={packsRoute.fullPath} style={LinkStyle}>
							<NavLink path={packsRoute.fullPath} label="Packs" />
						</Link>
						<Link to={itemsRoute.fullPath} style={LinkStyle}>
							<NavLink path={itemsRoute.fullPath} label="Packs" />
						</Link>
					</Flex>
				</Grid.Col>
				<Grid.Col span="content">
					<Flex gap="xs" align="center">
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
