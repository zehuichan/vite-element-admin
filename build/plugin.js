import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'

import uno from 'unocss/vite'

import legacy from '@vitejs/plugin-legacy'

import { configHtmlPlugin } from './html.js'
import { configSvgIconsPlugin } from './svgSprite'
import { configMockPlugin } from './mock.js'
import { configCompressPlugin } from './compress.js'

export function createVitePlugins(viteEnv, isBuild) {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, VITE_LEGACY } = viteEnv

  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // have to
    uno()
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  if (isBuild) {
    // vite-plugin-legacy
    VITE_LEGACY && vitePlugins.push(legacy())
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    )
  }

  return vitePlugins
}