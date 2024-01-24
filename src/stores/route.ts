import { persistent } from './utils'
import { type AllRoutes } from '@/routes'

const initialRoutes = {
	'/': {},
	'/banners': {},
	'/chars': { name: 'justia', costume: 0 },
	'/events': {},
	'/items': {},
	'/packs': {},
	'/tier': {},
}

const initialState = {
	routes: initialRoutes,
}

export const useRoutesStore = persistent<{
	routes: typeof initialRoutes
	storeParams: <T extends AllRoutes['path']>(props: {
		route: T
		params: (typeof initialRoutes)[T]
	}) => void
}>({ name: 'routes', keysToPersist: ['routes'] }, set => {
	return {
		...initialState,
		reset: () => {
			set(initialState)
		},
		storeParams: ({ route, params }) => {
			set(state => {
				state.routes[route] = params
			})
		},
	}
})
