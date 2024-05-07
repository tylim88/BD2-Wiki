import { toLowerCaseReplaceSpaceRemoveSpecialChars } from '@/utils'
import { type Characters } from '@/validation'
import { useQuery } from 'react-query'

export const useFetchCharacterData = (name: string) =>
	useQuery(['characters', name], () =>
		fetch(
			`data/characters/${toLowerCaseReplaceSpaceRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<Characters>
		})
	)

export const useFetchFoodRecipesData = (name: string) =>
	useQuery(['food_recipes', name], () =>
		fetch(
			`data/recipes/foods/${toLowerCaseReplaceSpaceRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<Characters>
		})
	)

export const useFetchFoodMaterialsData = (name: string) =>
	useQuery(['food_materials', name], () =>
		fetch(
			`data/materials/foods/${toLowerCaseReplaceSpaceRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<Characters>
		})
	)
