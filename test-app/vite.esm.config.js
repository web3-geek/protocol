import { defineConfig } from 'vite'
import { resolve } from 'node:path';

export default defineConfig({
  mode: 'production',
  build: {
    outDir: "dist-esm",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'esm/esm.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
    rollupOptions: {
      external: ['@tronweb3/google-protobuf', 'google-protobuf']
    },
  }
})