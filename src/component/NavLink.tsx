import { Text, NavLink as NavLink_ } from '@mantine/core'
import { useMatchRoute } from '@tanstack/react-router'
import classes from './NavLink.module.css'
import { theme } from '@/theme'

export const NavLink = ({ path, label }: { path: string; label: string }) => {
	const matchRoute = useMatchRoute()
	const isActive = matchRoute({ to: path })
	return (
		<NavLink_
			className={classes.navlink}
			component={'div'}
			bg={isActive ? 'black' : 'transparent'}
			key={path}
			style={{
				borderRadius: theme.radius.sm,
			}}
			active={isActive}
			label={
				<Text ta="center" fz="xl" mr="xs" c={isActive ? 'white' : 'dark'}>
					{label}
				</Text>
			}
		/>
	)
}
