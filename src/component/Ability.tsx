import { Loader } from '@mantine/core'
import { Suspense } from 'react'
import { type Characters } from '@/validation'
import { AbilityJustia } from './AbilityJustia'

const abilities: Record<string, React.FC<{ character: Characters }>> = {
	justia: AbilityJustia,
}

export const Ability = ({ character }: { character: Characters }) => {
	const Component = abilities[character.name]
	return Component ? (
		<Suspense fallback={<Loader />}>
			<Component character={character} />
		</Suspense>
	) : null
}
