import { toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars } from '@/utils'
import {
	type Characters,
	type FoodMaterials,
	type FoodRecipes,
	type Costumes,
} from '@/validation'
import { useQuery } from 'react-query'

export const useFetchCharacterData = (name: string) =>
	useQuery(['characters', name], () =>
		fetch(
			`data/characters/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<Characters>
		})
	)

export const useFetchCostumeData = ({
	name,
	costume,
}: {
	name: string
	costume: string
}) =>
	useQuery(['costumes', `${name}/${costume}`], () =>
		fetch(
			`data/costumes/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(costume)}.json`
		).then(res => {
			return res.json() as Promise<Costumes>
		})
	)

export const useFetchFoodRecipesData = (name: string) =>
	useQuery(['foodRecipes', name], () =>
		fetch(
			`data/recipes/foods/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<FoodRecipes>
		})
	)

export const useFetchFoodMaterialsData = (name: string) =>
	useQuery(['foodMaterials', name], () =>
		fetch(
			`data/materials/foods/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<FoodMaterials>
		})
	)
