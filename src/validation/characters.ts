import { array, number, string, object, literal, union, record, z } from 'zod'
import { monthAndDay, positiveInteger, stats } from './utils'

const ability = (num: 4 | 5) =>
	object({
		name: string(),
		type: string(),
		description: string(),
		costs: array(positiveInteger).length(num),
		variables: record(string(), array(positiveInteger)), // TODO write custom validation to match the number of variable keys with description and level
	})

export const characters = object({
	name: string(),
	version: positiveInteger,
	exclusive_gear: object({
		name: string(),
		ability: stats,
		basic_stat: stats,
	}),
	birthday: monthAndDay,
	kick: union([
		literal('top'),
		literal('bottom'),
		literal('left'),
		literal('right'),
		literal('top left'),
		literal('top right'),
		literal('bottom left'),
		literal('bottom right'),
		literal('pull top'),
		literal('pull bottom'),
		literal('pull left'),
		literal('pull right'),
		literal('pull top left'),
		literal('pull top right'),
		literal('pull bottom left'),
		literal('pull bottom right'),
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
