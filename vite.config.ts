import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    tartget:'es2016',
    outDir:'dist',
    lib: {
      // entry: path.resolve(__dirname, './src/LionCesiumSrc/LionViewer.ts'),
      // entry: path.resolve(__dirname, 'index.html'),
      entry: path.resolve(__dirname, 'LionCesium_main.js'),
      name: 'LionCesium',
      fileName: `LionCesium`
    },
    rollupOptions:{
      external: ['cesium'],
    }
  },
  server: {
    proxy: {
      "^/NORAD": {
        target: "https://celestrak.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/NORAD/, "/NORAD"),
      },
      "^/pub": {
        target: "https://celestrak.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pub/, "/pub"),
      },

    },
  },
})
