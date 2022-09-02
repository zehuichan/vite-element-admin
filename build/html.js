import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE } = env

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE
      }
    }
  })
}