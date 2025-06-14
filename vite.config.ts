import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',//解决控制台: Network: use --host to exposeport : 8080，//配置端口号
    port:8080,
    hmr: true, //开启热更新
    open: true,//启动在浏览器打开
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src ')
      }
    ]
  },
  define:{
    'process.env':{
      'BASE_API': "http://localhost:8089"
    }
  }
})



// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import { fileURLToPath } from "node:url";

// // https://vitejs.dev/config/
// export default defineConfig({
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
  
//   plugins: [vue()],
// });

