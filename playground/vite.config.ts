import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
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
      host: env.VITE_LOCALHOST,
      port: 4000,
      cors: true,
    },
    plugins: [
      Vue(),
    ],
  }
})
