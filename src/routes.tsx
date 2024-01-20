import { Router, Route, RootRoute } from '@tanstack/react-router'
import { App } from './App'

export const routes = [
	{ path: '/', label: 'Home', component: () => null },
	{ path: '/chars', label: 'Characters', component: () => null },
	{ path: '/tier', label: 'Tier List', component: () => null },
	{ path: '/banners', label: 'Banners', component: () => null },
	{ path: '/events', label: 'Events', component: () => null },
	{ path: '/packs', label: 'Packs', component: () => null },
	{ path: '/items', label: 'Items', component: () => null },
] as const

const rootRoute = new RootRoute({
	component: App,
})

export const router = new Router({
	routeTree: rootRoute.addChildren(
		routes.map(({ component, path }) => {
			return new Route({
				getParentRoute: () => rootRoute,
				path,
				component,
			})
		})
	),
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
