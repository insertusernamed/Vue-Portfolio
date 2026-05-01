import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const isDev = mode === 'development'

  const plugins: PluginOption[] = [vue(), vueJsx()]

  if (isDev) {
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
    const devtoolsPlugin = vueDevTools()
    if (devtoolsPlugin) {
      plugins.push(devtoolsPlugin)
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
