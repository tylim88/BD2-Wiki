import { array, number, string, object, literal, union, record, z } from 'zod'
import { date, monthAndDay, positiveInteger } from './utils'

const ability = (num: 4 | 5) =>
	object({
		name: string(),
		titles: array(string()).length(num),
		description: string(),
		costs: array(positiveInteger).length(num),
		variables: record(string(), array(positiveInteger)), // TODO write custom validation to match the number of variable keys with description and level
	})

const range = (num: 3 | 5) =>
	array(array(union([literal(1), literal(2), literal(0)])).length(num)).length(
		num
	)

export const characters = object({
	name: string(),
	version: positiveInteger,
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
		dmg: positiveInteger,
		resist: positiveInteger,
		hp: object({
			min: positiveInteger,
			max: positiveInteger,
		}),
		atk: object({
			min: positiveInteger,
			max: positiveInteger,
		}),
	}),
	costumes: array(
		object({
			name: string(),
			rarity: union([
				literal('regular'),
				literal('limited'),
				literal('collab'),
			]),
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
				cost: array(positiveInteger).length(6),
				cool_down: array(positiveInteger).length(6),
			}),
			profile: object({
				description: string(),
				age: union([positiveInteger, string()]),
				height: positiveInteger.max(200).min(100),
				birthday: monthAndDay,
				affiliation: string(),
				hobby: string(),
				like: string(),
				dislike: string(),
				cherish: string(),
				rumors: array(string()).length(2),
			}),
			lines: array(string()).length(10),
			audio: array(
				object({
					voice_actor: string(),
					language: union([literal('jp'), literal('kr')]),
				})
			),
		})
	),
})

export type Characters = z.infer<typeof characters>
