import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'vite'
import vitePluginRequire from "vite-plugin-require";
import { resolve } from 'node:path';

export default defineConfig({
  mode: 'production',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'cjs/cjs.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
    outDir: "dist-cjs",
    rollupOptions: {
      external: ['@tronweb3/google-protobuf']
    }
  },
  plugins: [commonjs()]
})