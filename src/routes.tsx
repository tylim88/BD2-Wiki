import { Router, Route, RootRoute } from '@tanstack/react-router'
import { App } from './App'
import { Characters } from './screens'
import { object, string, union, literal } from 'zod'
import { defaultCharParams } from '@/constants'

const rootRoute = new RootRoute({
	component: App,
})

const getParentRoute = () => rootRoute

export const homeRoute = new Route({
	path: '/',
	component: () => null,
	getParentRoute,
})

export const charValidateSearch = object({
	name: string().catch(defaultCharParams.name),
	costume: string().catch(defaultCharParams.costume),
	tab: union([
		literal(defaultCharParams.tab),
		literal('profile'),
		literal('lines'),
		literal('attributes'),
		literal('ability'),
		literal('unique_equipment'),
	]).catch(defaultCharParams.tab),
})

export const charRoute = new Route({
	path: `/chars`,
	component: Characters,
	validateSearch: charValidateSearch,
	getParentRoute,
})
export const tierRoute = new Route({
	path: '/tier',
	component: () => null,
	getParentRoute,
})

export const bannersRoute = new Route({
	path: '/banners',
	component: () => null,
	getParentRoute,
})

export const eventsRoute = new Route({
	path: '/events',
	component: () => null,
	getParentRoute,
})

export const packsRoute = new Route({
	path: '/packs',
	component: () => null,
	getParentRoute,
})

export const itemsRoute = new Route({
	path: '/items',
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
