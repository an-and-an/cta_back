import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport(({
      imports: ['vue', 'vuex', 'vue-router'],
      dirs: ['./src/api'],
      dts: './src/auto-import.d.ts',
    }))
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    hmr: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局变量
        additionalData: '@import "./src/assets/style/global-variables.scss";',
      },
    },
  },
  build: {
    chunkSizeWarningLimit:1500,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }

  }
})



