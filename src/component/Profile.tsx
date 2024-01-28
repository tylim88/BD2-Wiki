import { Grid, Text, Stack } from '@mantine/core'
import { Characters } from '@/validation'
import { format } from 'date-fns'

const Component = ({ value, label }: { value: string; label: string }) => {
	return (
		<Grid>
			<Grid.Col span={3} display="flex">
				<Text ta="left" tt="capitalize">
					{label}
				</Text>
				<Text
					ta="right"
					style={{
						flexGrow: 1,
					}}
				>
					:
				</Text>
			</Grid.Col>
			<Grid.Col span="auto">
				<Text ta="left">{value}</Text>
			</Grid.Col>
		</Grid>
	)
}

export const Profile = ({
	costume,
}: {
	costume: Characters['costumes'] extends (infer P)[] ? P : never
}) => {
	return (
		<Stack p="xl" pb="xs">
			{Object.entries(costume.profile).map(([key, value]) => {
				if (key === 'description') {
					return (
						<Text ta="center" pb="xl" size="1.5rem" key={key}>
							{value}
						</Text>
					)
				} else if (key === 'rumors') {
					return value.map((item, index) => {
						return (
							<Component key={item} value={item} label={`rumor ${index + 1}`} />
						)
					})
				} else {
					return (
						<Component
							label={key}
							key={key}
							value={
								key === 'age' && typeof value === 'number'
									? `${value} years old`
									: key === 'height'
										? `${value}cm`
										: key === 'birthday'
											? format(
													new Date(1996, value.month - 1, value.day),
													'MMMM do'
												)
											: key === 'age'
												? `${value}` // ? https://github.com/microsoft/TypeScript/issues/57200
												: value
							}
						/>
					)
				}
			})}
		</Stack>
	)
}
