import {
	createTheme,
	DEFAULT_THEME,
	mergeMantineTheme,
	Flex,
	Stack,
	Grid,
} from '@mantine/core'

const themeOverride = createTheme({
	fontFamily: 'Lato, Verdana, sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	headings: { fontFamily: 'Lato, Greycliff CF, sans-serif' },
	components: {
		Flex: Flex.extend({
			defaultProps: {
				align: 'center',
			},
		}),
		Stack: Stack.extend({
			defaultProps: { justify: 'center' },
		}),
		Grid: Grid.extend({
			defaultProps: { align: 'center' },
		}),
	},
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
