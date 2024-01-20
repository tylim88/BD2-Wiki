import { defineConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console'
import { resolve } from 'path'
import glob from 'glob'
import { resolve_ } from './vite.config'
export default defineConfig({
	plugins: [removeConsole({ includes: ['log'] })],
	root: __dirname,
	build: {
		rollupOptions: {
			input: glob.sync(resolve(__dirname, 'sw.ts')),
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	resolve: resolve_,
})
