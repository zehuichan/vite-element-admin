import compression from 'vite-plugin-compression'

export function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(',')

  const plugins = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compression({
        ext: '.gz',
        deleteOriginFile
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    )
  }
  return plugins
}