import justia from '%/characters/justia'
import { toLowerCaseAndReplaceSpace } from './utils'

export const defaultCharParams = {
	name: toLowerCaseAndReplaceSpace(justia.name),
	costume: toLowerCaseAndReplaceSpace(justia.costumes[0].name),
	tab: 'skill',
}
