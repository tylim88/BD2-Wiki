import {
	Center,
	Grid,
	Text,
	Flex,
	Image,
	NavLink,
	TextInput,
	ActionIcon,
} from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { Link, useMatchRoute } from '@tanstack/react-router'
import brand from '@/assets/brand.svg'
import { IconSearch, IconBrandGithubFilled } from '@tabler/icons-react'
import { routes } from '@/routes'
import classes from './Header.module.css'
import { glass } from '@/styles'

export const Header = () => {
	const theme = useMantineTheme()
	const matchRoute = useMatchRoute()

	return (
		<Center py="sm" style={glass} w="100%">
			<Grid maw={theme.breakpoints.xl} w="100%" align="center">
				<Grid.Col span="content">
					<Link to="/">
						<Image src={brand} h="2rem" />
					</Link>
				</Grid.Col>
				<Grid.Col span="auto">
					<Flex w="100%" align="center">
						{routes.map(({ path, label }) => {
							if (path === '/') return null
							const isActive = matchRoute({ to: path })
							return (
								<NavLink
									className={isActive ? '' : classes.header}
									component={Link}
									color="white"
									to={path}
									key={path}
									active={isActive}
									label={
										<Text fz="xl" c="dark" mr="xs">
											{label}
										</Text>
									}
								/>
							)
						})}
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
