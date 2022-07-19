import { createHtmlPlugin } from 'vite-plugin-html'
import defaultSettings from '../src/settings.js'

export function configHtmlPlugin(env, isBuild) {
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: defaultSettings
    },
  })
}