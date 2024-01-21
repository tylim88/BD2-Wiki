import { Grid } from '@mantine/core'
import { glass } from '@/styles'

export const Characters = () => {
	return (
		<Grid style={{ ...glass }} h="100%" w="100%">
			<Grid.Col span={'auto'}></Grid.Col>
			<Grid.Col span={'auto'}></Grid.Col>
		</Grid>
	)
}
