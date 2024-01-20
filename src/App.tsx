import { Container, BackgroundImage } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'
import { Header } from './component'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import BG1 from './assets/bg1.jpg'

export const App = () => {
	return (
		<Container w="100%" maw={9999} h="100%" p="0" m="0">
			<BackgroundImage
				src={BG1}
				h="100%"
				pos="fixed"
				style={{
					filter: 'blur(15px)',
				}}
			/>
			<Header />
			<Outlet />
			<TanStackRouterDevtools />
		</Container>
	)
}
