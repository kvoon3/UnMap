import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // vite 配置
    base: `/`,
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    build: {
      copyPublicDir: true,
      cssTarget: 'chrome49',
      emptyOutDir: 'dist',
    },
    preview: {
      port: 4000,
      cors: true,
    },
    plugins: [
      VueRouter({
        routesFolder: 'src/pages',
        extensions: ['.vue'],
        exclude: ['**/*.component.vue'],
        dts: './typed-router.d.ts',
        routeBlockLang: 'yaml',
        importMode: 'async',
      }),
      Vue(),
      Components(),
      AutoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          {
            'vue-router/auto': ['useLink'],
          },
          {
            consola: ['consola'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),
      Unocss(),
    ],
  }
})
