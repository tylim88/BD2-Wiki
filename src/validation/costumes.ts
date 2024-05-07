import { array, string, object, literal, union, record, z } from 'zod'
import { date, positiveInteger } from './utils'

const range = (num: 3 | 5) =>
	array(array(union([literal(1), literal(2), literal(0)])).length(num)).length(
		num
	)

export const costumes = object({
	name: string(),
	rarity: union([literal('regular'), literal('limited'), literal('collab')]),
	release_date: date,
	banners: array(object({ from: date, to: date })),
	skill: object({
		name: string(),
		target: union([
			literal('me'),
			literal('very front'),
			literal('skip'),
			literal('all'),
		]),
		range: union([range(3), range(5)]),
		description: string(),
		variables: record(string(), array(positiveInteger)), // TODO write custom validation to match the number of variable keys with description
		costs: array(positiveInteger).length(6),
		cool_down: array(positiveInteger).length(6),
	}),
	profile: object({
		description: string(),
		age: string(),
		height: string(),
		affiliation: string(),
		hobby: string(),
		like: string(),
		dislike: string(),
		cherish: string(),
		rumors: array(string()).length(2),
	}),
	lines: array(string()).length(10),
	voices: array(
		object({
			actor: string(),
			language: union([literal('jp'), literal('kr')]),
		})
	),
})

export type Costumes = z.infer<typeof costumes>
