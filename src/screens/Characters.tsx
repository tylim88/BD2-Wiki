import { Grid } from '@mantine/core'
import { content } from '@/styles'

const left = 5

export const Characters = () => {
	return (
		<Grid
			h="100%"
			w="100%"
			styles={{
				inner: { height: '100%' },
			}}
		>
			<Grid.Col span={left}></Grid.Col>
			<Grid.Col span={12 - left} style={content} h="100%"></Grid.Col>
		</Grid>
	)
}
