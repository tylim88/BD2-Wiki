import { persistent } from './utils'

const initialState = {
	slider: { skill: {}, attributes: {} },
}

export const useCharactersStore = persistent<{
	slider: {
		skill: Record<string, number>
		attributes: Record<string, number>
	}
}>({ name: 'characters', keysToPersist: ['slider'] }, set => {
	return {
		...initialState,
		reset: () => {
			set(initialState)
		},
	}
})
