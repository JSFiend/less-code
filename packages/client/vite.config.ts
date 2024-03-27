import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import { viteMockServe } from 'vite-plugin-mock';

import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({ watchFiles: true }),
    monacoEditorPlugin.default({}),
    AutoImport({ 
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],

      resolvers: [
        ElementPlusResolver(),
      ],
     }),
    Components({
      dirs: ['src/components', 'src/ui-lib'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
  ],
  resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
      '~types': resolve(__dirname, '../types'),
      'op-kit': resolve(__dirname, '../op-kit/src')
		},
	},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `@use "@/styles/element/index.scss" as *;`,
        ],
      },
    },
  },
})
