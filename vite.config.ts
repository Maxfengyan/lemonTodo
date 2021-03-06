/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from "path";
import { UserConfig } from "vite";
import dotenv from "dotenv";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/render/plugin/icons/svgBuilder";
dotenv.config({ path: join(__dirname, ".env") });
const root = join(__dirname, "src/render");

const config: UserConfig = {
  root,
  resolve: {
    alias: {
      "/@": root,
    },
  },
  base: "./",
  build: {
    outDir: join("../../dist/render"),
    emptyOutDir: true,
  },
  server: {
    port: +process.env.PORT,
  },
  plugins: [vue(),
    svgBuilder("./src/render/plugin/icons/svg/"),],
  optimizeDeps: {
    exclude: ["electron-is-dev", "electron-store"],
  },
};

export default config;
