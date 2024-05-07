import { toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars } from '@/utils'
import {
	type Characters,
	type FoodMaterials,
	type FoodRecipes,
	type Costumes,
} from '@/validation'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useFetchCharacterData = (name: string) =>
	useQuery({
		queryKey: ['characters', name],
		queryFn: () =>
			fetch(
				`data/characters/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
			).then(res => {
				return res.json() as Promise<Characters>
			}),
	})

export const useFetchCostumeData = ({
	name,
	costume,
}: {
	name: string
	costume: string
}) =>
	useQuery({
		queryKey: ['costumes', name, costume],
		placeholderData: keepPreviousData,
		queryFn: () =>
			fetch(
				`data/costumes/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(costume)}.json`
			).then(res => {
				return res.json() as Promise<Costumes>
			}),
	})

export const useFetchFoodRecipesData = (name: string) =>
	useQuery({
		queryKey: ['foodRecipes', name],
		queryFn: () =>
			fetch(
				`data/recipes/foods/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
			).then(res => {
				return res.json() as Promise<FoodRecipes>
			}),
	})

export const useFetchFoodMaterialsData = (name: string) =>
	useQuery({
		queryKey: ['foodMaterials', name],
		queryFn: () =>
			fetch(
				`data/materials/foods/${toLowerCaseReplaceSpaceAndHyphenRemoveSpecialChars(name)}.json`
			).then(res => {
				return res.json() as Promise<FoodMaterials>
			}),
	})
