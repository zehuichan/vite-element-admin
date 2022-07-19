import { defineConfig, loadEnv } from 'vite'
import { pathResolve, wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'
import pkg from './package.json'
import dayjs from 'dayjs'

const { name, version } = pkg

const __APP_INFO__ = {
	name,
	version,
	lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const root = process.cwd()

	const env = loadEnv(mode, root)

	const viteEnv = wrapperEnv(env)

	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

	const isBuild = command === 'build'

	return {
		base: VITE_PUBLIC_PATH,
		root: root,
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		plugins: createVitePlugins(viteEnv, isBuild),
		resolve: {
			alias: {
				'@': pathResolve('./src')
			}
		},
		css: {
			preprocessorOptions: {
				less: {
					additionalData: `@import "@/assets/less/var.less";`
				}
			}
		},
		server: {
			host: true,
			port: VITE_PORT,
			proxy: createProxy(VITE_PROXY)
		},
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					keep_infinity: true,
					// Used to delete console in production environment
					drop_console: VITE_DROP_CONSOLE
				}
			},
			// Turning off brotliSize display can slightly reduce packaging time
			brotliSize: false,
			chunkSizeWarningLimit: 2000
		}
	}
})
