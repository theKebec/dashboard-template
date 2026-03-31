import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    vue(),

    UnoCSS(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),

    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@image": path.resolve(__dirname, "src/assets/image"),
    },
  },

  server: {
    port: 4396,
    host: true,
    proxy: {
      "/api": {
        target: "http://gateway.dev.snpit.com:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/miniofile": {
        target: "http://minio.dev.snpit.com:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/miniofile/, ""),
      },
    },
  },
});
