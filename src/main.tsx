import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { isProduction } from './config'
import './main.css'
import '@mantine/core/styles.css'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'
// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js').catch(error => {
// 		console.error('Service Worker registration failed:', error)
// 	})
// }

const queryClient = new QueryClient()

!isProduction &&
	import('eruda')
		// @ts-expect-error ...
		.then(eruda => eruda.init())
		.catch(({ e }) => {
			console.error({ e })
		})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<MantineProvider theme={theme}>
					<RouterProvider router={router} />
				</MantineProvider>
			</HelmetProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
