import { array, number, string, object, literal, union, record, z } from 'zod'
import { monthAndDay, positiveInteger } from './utils'

const ability = (num: 4 | 5) =>
	object({
		name: string(),
		titles: array(string()).length(num),
		description: string(),
		costs: array(positiveInteger).length(num),
		variables: record(string(), array(positiveInteger)), // TODO write custom validation to match the number of variable keys with description and level
	})

export const characters = object({
	name: string(),
	version: positiveInteger,
	exclusive_gear: string(),
	birthday: monthAndDay,
	kick: union([
		literal('up'),
		literal('down'),
		literal('left'),
		literal('right'),
		literal('up left'),
		literal('up right'),
		literal('down left'),
		literal('down right'),
	]),
	target: union([literal('skip'), literal('very front')]),
	dmg_type: union([literal('physical'), literal('magic')]),
	element: union([
		literal('light'),
		literal('dark'),
		literal('water'),
		literal('wind'),
		literal('fire'),
	]),
	rarity: number().int().min(3).max(5),
	ability: union([ability(4), ability(5)]),
	attributes: object({
		initial_combat_power: positiveInteger,
		crit_rate: positiveInteger,
		crit_dmg: positiveInteger,
		def: positiveInteger,
		magic_resist: positiveInteger,
		prop_dmg: positiveInteger,
		prop_resist: positiveInteger,
		hp: object({
			min: positiveInteger,
			max: positiveInteger,
		}),
		atk: object({
			min: positiveInteger,
			max: positiveInteger,
		}),
	}),
	costumes: array(string()),
})

export type Characters = z.infer<typeof characters>
