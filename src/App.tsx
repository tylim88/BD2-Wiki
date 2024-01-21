import { Stack, BackgroundImage, Center, Loader } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'
import { Header, TanStackRouterDevtools } from './component'
import BG1 from './assets/bg1.jpg'
import { Suspense } from 'react'

export const App = () => {
	return (
		<Stack w="100%" maw={9999} h="100%" gap={0}>
			<BackgroundImage
				src={BG1}
				h="100%"
				pos="fixed"
				style={{
					filter: 'blur(15px)',
				}}
			/>
			<Header />
			<Center
				p="xl"
				style={{
					flex: '1 1 auto',
				}}
			>
				<Outlet />
			</Center>
			<Suspense fallback={<Loader />}>
				<TanStackRouterDevtools />
			</Suspense>
		</Stack>
	)
}
