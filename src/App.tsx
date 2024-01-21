import {
	Stack,
	BackgroundImage,
	Center,
	useMantineTheme,
	Loader,
} from '@mantine/core'
import { Outlet } from '@tanstack/react-router'
import { Header, TanStackRouterDevtools } from './component'
import BG1 from './assets/bg1.jpg'
import { Suspense } from 'react'

export const App = () => {
	const theme = useMantineTheme()

	return (
		<Stack
			w="100%"
			maw={9999}
			h="100%"
			gap="lg"
			justify="center"
			align="center"
		>
			<BackgroundImage
				src={BG1}
				h="100%"
				pos="fixed"
				style={{
					filter: 'blur(15px)',
				}}
			/>
			<Header />
			<Header invisible />
			<Center
				maw={theme.breakpoints.xl}
				w="100%"
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
