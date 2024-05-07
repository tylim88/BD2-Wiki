import { Grid, Text, Stack } from '@mantine/core'
import { type Characters, type Costumes } from '@/validation'
import { format } from 'date-fns'

const Item = ({ value, label }: { value: string; label: string }) => {
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

const labels = [
	'description',
	'age',
	'height',
	'birthday',
	'affiliation',
	'hobby',
	'like',
	'dislike',
	'cherish',
	'rumors',
] as const

export const Profile = ({
	birthday,
	costume,
}: {
	birthday: Characters['birthday']
	costume: Costumes
}) => {
	return (
		<Stack p="xl" pb="xs">
			{labels.map(label => {
				if (label === 'birthday')
					return (
						<Item
							label={label}
							key={label}
							value={format(
								new Date(1996, birthday.month - 1, birthday.day),
								'MMMM do'
							)}
						/>
					)

				if (label === 'description')
					return (
						<Text ta="center" pb="xl" size="1.5rem" key={label}>
							{costume.profile[label]}
						</Text>
					)

				if (label === 'rumors')
					return costume.profile[label].map((item, index) => {
						return <Item key={item} value={item} label={`rumor ${index + 1}`} />
					})

				return <Item label={label} key={label} value={costume.profile[label]} />
			})}
		</Stack>
	)
}
