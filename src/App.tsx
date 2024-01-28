import { Stack, BackgroundImage, Center, Loader } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'
import { Header, TanStackRouterDevtools } from './component'
import BG1 from './assets/bg1.jpg'
import { Suspense, useState } from 'react'
import { theme } from './theme'

export const App = () => {
	const [ref, setRef] = useState<HTMLDivElement | null>(null)

	return (
		<Stack w="100%" maw={9999} h="100%" gap="lg" align="center">
			<BackgroundImage
				src={BG1}
				h="100%"
				pos="fixed"
				style={{
					filter: 'blur(15px)',
				}}
			/>
			<Header setRef={setRef} />
			<div
				style={{
					visibility: 'hidden',
					height: ref?.offsetHeight || 0,
				}}
			/>
			<Center
				maw={theme.breakpoints.xl}
				px="xl"
				h="100%"
				w="100%"
				style={{
					flex: '1 1 auto',
					overflow: 'auto',
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
