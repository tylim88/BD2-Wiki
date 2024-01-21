import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { qrcode } from 'vite-plugin-qrcode'
import mkcert from 'vite-plugin-mkcert'
import removeConsole from 'vite-plugin-remove-console'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: false,
	},
	plugins: [
		tsconfigPaths(),
		qrcode(),
		react(),
		(svgr as () => PluginOption)(),
		mkcert(),
		removeConsole({ includes: ['log'] }),
		viteStaticCopy({
			targets: [
				{
					src: '_redirects',
					dest: '',
				},
				{
					src: 'manifest.json',
					dest: '',
				},
				{
					src: 'images',
					dest: '',
				},
			],
		}),
	],
})
