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
  proptypes: "src/components/proptypes/index",
  tryOnScopeDispose: "src/components/tryOnScopeDispose/",
  useEventListener: "src/components/useEventListener/"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbWVkaWEvcm1uL3NzZDEvZ2l0aHViL2F5b3Rvbi9heW92dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9ybW4vc3NkMS9naXRodWIvYXlvdG9uL2F5b3Z1ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbWVkaWEvcm1uL3NzZDEvZ2l0aHViL2F5b3Rvbi9heW92dWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcbmltcG9ydCBlbnRyaWVzIGZyb20gXCIuL2VudHJpZXMuanNvblwiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5jb25zdCBwa2cgPSBge1xuICBcIm1haW5cIjogXCIuL2luZGV4LmNqcy5qc1wiLFxuICBcIm1vZHVsZVwiOiBcIi4vaW5kZXguZXMuanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vaW5kZXguZC50c1wiXG59YFxuY29uc3Qgd3JpdGVQS0cgPSAoX3BhdGg6IHN0cmluZywgXzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGZpbGVOYW1lID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShfcGF0aCksIFwicGFja2FnZS5qc29uXCIpXG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZU5hbWUsIHBrZylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoe1xuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgd2hpdGVzcGFjZTogXCJjb25kZW5zZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHRyaW06IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgY2xlYW5WdWVGaWxlTmFtZTogdHJ1ZSxcbiAgICAgIGJlZm9yZVdyaXRlRmlsZTogd3JpdGVQS0csXG4gICAgICBjb3B5RHRzRmlsZXM6IGZhbHNlLFxuICAgICAgZW50cnlSb290OiBcInNyYy9jb21wb25lbnRzXCIsXG4gICAgICBvdXRwdXREaXI6IFwicGFja2FnZXNcIixcbiAgICAgIHN0YXRpY0ltcG9ydDogdHJ1ZSxcblxuICAgICAgYWZ0ZXJCdWlsZDogKCkgPT4ge30sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBvdXREaXI6IFwicGFja2FnZXNcIixcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBlbnRyaWVzLFxuICAgICAgZmlsZU5hbWUoZm9ybWF0LCBlbnRyeU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGAke2VudHJ5TmFtZX0vaW5kZXguJHtmb3JtYXR9LmpzYFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIiwgbmV3IFJlZ0V4cChcIl5heW92dWUvXCIpXSxcbiAgICAgIHRyZWVzaGFrZTogdHJ1ZSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBjb21wYWN0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFROzs7Ozs7Ozs7Ozs7QUFJZixJQUFNLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtaLElBQU0sV0FBVyxDQUFDLE9BQWUsTUFBYztBQUM3QyxRQUFNLFdBQVcsS0FBSyxLQUFLLEtBQUssUUFBUSxLQUFLLEdBQUcsY0FBYztBQUM5RCxLQUFHLGNBQWMsVUFBVSxHQUFHO0FBQ2hDO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BRWQsWUFBWSxNQUFNO0FBQUEsTUFBQztBQUFBLElBQ3JCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxTQUFTLFFBQVEsV0FBVztBQUMxQixlQUFPLEdBQUcsbUJBQW1CO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTyxJQUFJLE9BQU8sVUFBVSxDQUFDO0FBQUEsTUFDeEMsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
