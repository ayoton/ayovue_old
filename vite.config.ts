import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import path from "path"
import fs from "fs"
import entries from "./entries.json"

// https://vitejs.dev/config/
const pkg = `{
  "main": "./index.cjs.js",
  "module": "./index.es.js",
  "types": "./index.d.ts"
}`
const writePKG = (_path: string, _: string) => {
  const fileName = path.join(path.dirname(_path), "package.json")
  fs.writeFileSync(fileName, pkg)
}

export default defineConfig({
  resolve: {},
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: "condense",
        },
      },
      style: {
        trim: false,
      },
    }),
    dts({
      cleanVueFileName: true,
      beforeWriteFile: writePKG,
      copyDtsFiles: false,
      entryRoot: "src",
      outputDir: "packages",
      staticImport: true,
    }),
  ],
  build: {
    minify: false,
    outDir: "packages",
    assetsDir: "src/themes",
    lib: {
      entry: entries,
      fileName(format, entryName) {
        return `${entryName}/index.${format}.js`
      },
    },
    rollupOptions: {
      external: ["vue", new RegExp("^ayovue/")],
      treeshake: true,
      output: {
        compact: false,
      },
    },
  },
})
