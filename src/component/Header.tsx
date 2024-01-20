import {
	Center,
	Grid,
	Text,
	Flex,
	Image,
	NavLink,
	TextInput,
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import brand from '@/assets/brand.svg'
import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { routes } from '@/routes'
import classes from './Header.module.css'

export const Header = () => {
	const [active, setActive] = useState(0)
	return (
		<Center
			py="sm"
			style={{
				background: 'rgba(197,170,106, 0.5)',
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(20px)',
				border: '1px solid rgba(197,170,106, 0.3)',
			}}
		>
			<Grid maw="1336px" w="100%" align="center">
				<Grid.Col span="content">
					<Link to="/">
						<Image src={brand} h="2rem" />
					</Link>
				</Grid.Col>
				<Grid.Col span="auto">
					<Flex w="100%" align="center">
						{routes.map(({ path, label }, index) => {
							if (path === '/') return null
							return (
								<NavLink
									className={classes.nav || ''}
									color="white"
									component={Link}
									to={path}
									key={path}
									active={index === active}
									label={
										<Text fz="xl" c="dark" mr="xs">
											{label}
										</Text>
									}
									onClick={() => {
										setActive(index)
									}}
								/>
							)
						})}
					</Flex>
				</Grid.Col>
				<Grid.Col span="content">
					<TextInput leftSection={<IconSearch />} placeholder="Search" />
				</Grid.Col>
			</Grid>
		</Center>
	)
}
