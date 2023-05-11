// vite.config.ts
import { defineConfig } from "file:///media/rmn/ssd1/github/ayoton/ayovue/node_modules/vite/dist/node/index.js";
import vue from "file:///media/rmn/ssd1/github/ayoton/ayovue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///media/rmn/ssd1/github/ayoton/ayovue/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
import fs from "fs";

// entries.json
var entries_default = {
  AInput: "src/components/AInput/index.vue",
  AButton: "src/components/AButton/index.vue",
  AInputFile: "src/components/AInputFile/index.vue",
  proptypes: "src/components/proptypes/index",
  useDate: "src/components/useDate/",
  composables: "src/components/composables/"
};

// vite.config.ts
var pkg = `{
  "main": "./index.cjs.js",
  "module": "./index.es.js",
  "types": "./index.d.ts"
}`;
var writePKG = (_path, _) => {
  const fileName = path.join(path.dirname(_path), "package.json");
  fs.writeFileSync(fileName, pkg);
};
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0"
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: "condense"
        }
      },
      style: {
        trim: false
      }
    }),
    dts({
      cleanVueFileName: true,
      beforeWriteFile: writePKG,
      copyDtsFiles: false,
      entryRoot: "src/components",
      outputDir: "packages",
      staticImport: true,
      afterBuild: () => {
      }
    })
  ],
  build: {
    minify: false,
    outDir: "packages",
    lib: {
      entry: entries_default,
      fileName(format, entryName) {
        return `${entryName}/index.${format}.js`;
      }
    },
    rollupOptions: {
      external: ["vue", new RegExp("^ayovue/")],
      treeshake: true,
      output: {
        compact: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbWVkaWEvcm1uL3NzZDEvZ2l0aHViL2F5b3Rvbi9heW92dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9ybW4vc3NkMS9naXRodWIvYXlvdG9uL2F5b3Z1ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbWVkaWEvcm1uL3NzZDEvZ2l0aHViL2F5b3Rvbi9heW92dWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBlbnRyaWVzIGZyb20gXCIuL2VudHJpZXMuanNvblwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuY29uc3QgcGtnID0gYHtcbiAgXCJtYWluXCI6IFwiLi9pbmRleC5janMuanNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2luZGV4LmVzLmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2luZGV4LmQudHNcIlxufWA7XG5jb25zdCB3cml0ZVBLRyA9IChfcGF0aDogc3RyaW5nLCBfOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgZmlsZU5hbWUgPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKF9wYXRoKSwgXCJwYWNrYWdlLmpzb25cIik7XG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZU5hbWUsIHBrZyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIlxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIHdoaXRlc3BhY2U6IFwiY29uZGVuc2VcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgdHJpbTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgY2xlYW5WdWVGaWxlTmFtZTogdHJ1ZSxcbiAgICAgIGJlZm9yZVdyaXRlRmlsZTogd3JpdGVQS0csXG4gICAgICBjb3B5RHRzRmlsZXM6IGZhbHNlLFxuICAgICAgZW50cnlSb290OiBcInNyYy9jb21wb25lbnRzXCIsXG4gICAgICBvdXRwdXREaXI6IFwicGFja2FnZXNcIixcbiAgICAgIHN0YXRpY0ltcG9ydDogdHJ1ZSxcblxuICAgICAgYWZ0ZXJCdWlsZDogKCkgPT4ge31cbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgb3V0RGlyOiBcInBhY2thZ2VzXCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogZW50cmllcyxcbiAgICAgIGZpbGVOYW1lKGZvcm1hdCwgZW50cnlOYW1lKSB7XG4gICAgICAgIHJldHVybiBgJHtlbnRyeU5hbWV9L2luZGV4LiR7Zm9ybWF0fS5qc2A7XG4gICAgICB9XG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIG5ldyBSZWdFeHAoXCJeYXlvdnVlL1wiKV0sXG4gICAgICB0cmVlc2hha2U6IHRydWUsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgY29tcGFjdDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sUUFBUTs7Ozs7Ozs7Ozs7OztBQUlmLElBQU0sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS1osSUFBTSxXQUFXLENBQUMsT0FBZSxNQUFjO0FBQzdDLFFBQU0sV0FBVyxLQUFLLEtBQUssS0FBSyxRQUFRLEtBQUssR0FBRyxjQUFjO0FBQzlELEtBQUcsY0FBYyxVQUFVLEdBQUc7QUFDaEM7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsVUFDZixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxjQUFjO0FBQUEsTUFFZCxZQUFZLE1BQU07QUFBQSxNQUFDO0FBQUEsSUFDckIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLFNBQVMsUUFBUSxXQUFXO0FBQzFCLGVBQU8sR0FBRyxtQkFBbUI7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLElBQUksT0FBTyxVQUFVLENBQUM7QUFBQSxNQUN4QyxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
