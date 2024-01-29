import { Loader, Stack, Flex, Image, Text } from '@mantine/core'
import { Suspense, lazy } from 'react'
import { type Characters } from '@/validation'
import { toLowerCaseReplaceSpaceRemoveSpecialChars } from '@/utils'

// not type safe, point of failure
const abilities: Record<string, React.FC<{ character: Characters }>> = {
	justia: lazy(() =>
		import('./AbilityJustia').then(res => ({
			default: res.AbilityJustia,
		}))
	),
}

export const Ability = ({ character }: { character: Characters }) => {
	const Component = abilities[character.name]

	return (
		<Stack p="xs" pt="lg" pb="xl" align="center" gap="xl">
			<Flex justify="start" w="100%" gap="xs">
				<Image
					src={`/icons/abilities/${toLowerCaseReplaceSpaceRemoveSpecialChars(character.name)}.png`}
					h="3.5em"
				/>
				<Text ta="left" size="2em" fs="italic">
					{character.ability.name}
				</Text>
				<Image
					src={`/icons/abilities/${character.ability.name}`}
					h="3.5em"
					w="3.5em"
				/>
			</Flex>
			{Component ? (
				<Suspense fallback={<Loader />}>
					<Component character={character} />
				</Suspense>
			) : null}
		</Stack>
	)
}
