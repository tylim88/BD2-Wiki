import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'

const themeOverride = createTheme({
	fontFamily: 'Lato, Verdana, sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	headings: { fontFamily: 'Lato, Greycliff CF, sans-serif' },
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
