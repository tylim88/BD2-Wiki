import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import './main.css'
import '@mantine/core/styles.css'

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js').catch(error => {
// 		console.error('Service Worker registration failed:', error)
// 	})
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<MantineProvider
				theme={{
					fontFamily: 'Lato, Verdana, sans-serif',
					fontFamilyMonospace: 'Monaco, Courier, monospace',
					headings: { fontFamily: 'Lato, Greycliff CF, sans-serif' },
				}}
			>
				<RouterProvider router={router} />
			</MantineProvider>
		</HelmetProvider>
	</React.StrictMode>
)
