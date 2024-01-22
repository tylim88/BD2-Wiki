import { Router, Route, RootRoute } from '@tanstack/react-router'
import { App } from './App'
import { Characters } from './screens'
import { object, number, string } from 'zod'

export const routes = [
	{ path: '/', label: 'Home', component: () => null, validateSearch: {} },
	{
		path: `/chars`,
		label: 'Characters',
		component: Characters,
		validateSearch: object({
			name: string().catch('justia'),
			costume: number().catch(0),
		}),
	},
	{
		path: '/tier',
		label: 'Tier List',
		component: () => null,
		validateSearch: {},
	},
	{
		path: '/banners',
		label: 'Banners',
		component: () => null,
		validateSearch: {},
	},
	{
		path: '/events',
		label: 'Events',
		component: () => null,
		validateSearch: {},
	},
	{ path: '/packs', label: 'Packs', component: () => null, validateSearch: {} },
	{ path: '/items', label: 'Items', component: () => null, validateSearch: {} },
] as const

const rootRoute = new RootRoute({
	component: App,
})

const getParentRoute = () => rootRoute

export const homeRoute = new Route({
	...routes['0'],
	getParentRoute,
})

export const charRoute = new Route({
	...routes['1'],
	getParentRoute,
})
export const tierRoute = new Route({
	...routes['2'],
	getParentRoute,
})

export const bannersRoute = new Route({
	...routes['3'],
	getParentRoute,
})

export const eventsRoute = new Route({
	...routes['4'],
	getParentRoute,
})

export const packsRoute = new Route({
	...routes['5'],
	getParentRoute,
})

export const itemsRoute = new Route({
	...routes['6'],
	getParentRoute,
})

const allRoutes = [
	homeRoute,
	charRoute,
	tierRoute,
	bannersRoute,
	eventsRoute,
	packsRoute,
	itemsRoute,
] as const

export const router = new Router({
	routeTree: rootRoute.addChildren([...allRoutes]),
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export type AllRoutes = typeof allRoutes extends readonly [...(infer P)[]]
	? P
	: never
