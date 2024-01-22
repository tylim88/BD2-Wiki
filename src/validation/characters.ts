import { array, number, string, object, literal, union, record, z } from 'zod'
import { date, monthAndDay, positiveInteger } from './utils'

export const characters = object({
	name: string(),
	version: positiveInteger,
	property: union([
		literal('light'),
		literal('dark'),
		literal('water'),
		literal('wind'),
		literal('fire'),
	]),
	rarity: number().int().min(1).max(0),
	ability: object({
		name: string(),
		titles: array(string()),
		costs: array(positiveInteger),
		description: string(),
		variables: record(string(), positiveInteger),
	}),
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
				targets: union([literal('me'), literal('very front'), literal('skip')]),
				range: array(array(union([literal(1), literal(2), literal(0)]))),
				description: string(),
				variables: record(string(), positiveInteger),
				cost: positiveInteger,
				cost_reduction_at: positiveInteger,
				cool_down: positiveInteger,
			}),
			profile: object({
				description: string(),
				age: union([positiveInteger, string()]),
				height: positiveInteger,
				birthday: monthAndDay,
				affiliation: string(),
				hobby: string(),
				like: string(),
				dislike: string(),
				cherish: string(),
				rumors: array(string()),
			}),
			lines: array(string()),
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
