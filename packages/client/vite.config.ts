import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
})
