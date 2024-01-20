import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, CSSVariablesResolver } from '@mantine/core'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import './index.css'
import '@mantine/core/styles.css'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').catch(error => {
		console.error('Service Worker registration failed:', error)
	})
}

const resolver: CSSVariablesResolver = theme => ({
	variables: {
		'--nl-hover': 'red',
	},
	light: {},
	dark: {},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<MantineProvider
				cssVariablesResolver={resolver}
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
