import { toLowerCaseReplaceSpaceRemoveSpecialChars } from '@/utils'
import { type Characters } from '@/validation'
import { useQuery } from 'react-query'

export const useQueryCharacterData = (name: string) =>
	useQuery(['characters', name], () =>
		fetch(
			`/characters/${toLowerCaseReplaceSpaceRemoveSpecialChars(name)}.json`
		).then(res => {
			return res.json() as Promise<Characters>
		})
	)
