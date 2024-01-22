import { number, object } from 'zod'

export const positiveInteger = number().int().positive()
export const monthAndDay = object({
	month: positiveInteger.min(1).max(12),
	day: positiveInteger.min(1).max(31),
})
export const date = object({
	year: positiveInteger.min(2023).max(2050),
}).merge(monthAndDay)
