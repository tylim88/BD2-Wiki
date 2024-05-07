import { array, number, string, object, literal, union, z } from 'zod'

export const foodRecipes = object({
	name: string(),
	rarity: number().min(1).max(5).int(),
	description: string(),
	ingredients: array(
		object({ name: string(), count: number().min(1).max(10).int() })
	),
	pills: number().min(1).max(10).int(),
	restore: number().min(1).max(500).int(),
	location: union([
		object({
			type: literal('account creation'),
		}),
		object({
			type: union([literal('main quest'), literal('search')]),
			pack: string(),
		}),
	]),
})

export type FoodRecipes = z.infer<typeof foodRecipes>

export const foodMaterials = object({
	name: string(),
	description: string(),
	restore: number().min(1).max(500).int(),
	location: array(
		object({
			type: union([literal('basic'), literal('search'), literal('shop')]),
			pack: string(),
		})
	),
})

export type FoodMaterials = z.infer<typeof foodMaterials>
