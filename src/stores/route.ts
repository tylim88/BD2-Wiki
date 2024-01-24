import { persistent } from './utils'
import { type AllRoutes, charValidateSearch } from '@/routes'
import { z } from 'zod'
import { defaultCharParams } from '@/constants'

const initialRoutes = {
	'/': {},
	'/banners': {},
	'/chars': {
		name: defaultCharParams.name,
		costume: defaultCharParams.costume,
		tab: defaultCharParams.tab,
	} as z.infer<typeof charValidateSearch>,
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
		params: Partial<(typeof initialRoutes)[T]>
	}) => void
}>({ name: 'routes', keysToPersist: ['routes'] }, set => {
	return {
		...initialState,
		reset: () => {
			set(initialState)
		},
		storeParams: ({ route, params }) => {
			set(state => {
				state.routes[route] = { ...state.routes[route], ...params }
			})
		},
	}
})
