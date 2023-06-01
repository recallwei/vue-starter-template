import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useToggle', 'useEventListener', 'useDebounceFn']
        },
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        },
        {
          from: 'naive-ui',
          imports: ['FormInst', 'FormRules', 'UploadFileInfo', 'UploadCustomRequestOptions'],
          type: true
        }
      ]
    }),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()]
    }),
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
    proxy: {
      '/api-prefix': {
        target: 'localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-prefix/, '')
      }
    }
  }
})
