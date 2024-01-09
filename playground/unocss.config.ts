import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-1 rounded inline-block bg-secondary border-box cursor-pointer hover:bg-active disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'border-box': 'border border-base rounded',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600; font-size: 0.9em',
    'flex-center': 'justify-center items-center',
    'flex-v-center': 'justify-center',
    'flex-s-center': 'items-center',
    'bg-base': 'bg-white dark:bg-black',
    'bg-secondary': 'bg-gray:10',
    'bg-active': 'bg-gray:15',
    'text-base': 'text-black dark:text-white',
    'border-base': 'border dark:border-dark-1 border-slate-1',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
