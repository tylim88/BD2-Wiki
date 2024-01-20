import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { qrcode } from 'vite-plugin-qrcode'
import mkcert from 'vite-plugin-mkcert'
import removeConsole from 'vite-plugin-remove-console'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
export const resolve_ = {
	alias: [
		{ find: '@', replacement: resolve(__dirname, 'src') },
		{ find: '%', replacement: resolve(__dirname, 'functions/src') },
	],
}
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: false,
	},
	plugins: [
		qrcode(),
		react(),
		(svgr as () => PluginOption)(),
		mkcert(),
		removeConsole({ includes: ['log'] }),
		viteStaticCopy({
			targets: [
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
	resolve: resolve_,
})
