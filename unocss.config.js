import { defineConfig, transformerDirectives } from 'unocss'

export default defineConfig({
  rules: [],
  shortcuts: {
    'flex-center': 'flex items-center justify-center'
  },
  theme: {
    colors: {
      primary: '#409eff',
      success: '#67c23a',
      info: '#909399',
      warning: '#e6a23c',
      danger: '#f56c6c'
    }
  },
  transformers: [
    transformerDirectives()
  ]
})