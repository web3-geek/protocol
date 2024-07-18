import resolve from '@rollup/plugin-node-resolve';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { createFilter } from '@rollup/pluginutils';

export default {
  input: {
    'google-protobuf': 'src/index.js',
    'any_pb': 'src/any_pb.js',
    'smart_contract_pb': 'src/core/contract/smart_contract_pb.js'
  },
  output: {
    entryFileNames: '[name].ts',
    chunkFileNames: '[name]-[hash].ts',
    dir: 'build',
    format: 'es',
    banner: "/* Generated by rollup. Don't edit it. */\n // @ts-nocheck"
  },
  plugins: [
    transformRequirePlugin({ include: 'src/core/**/*' }),
    resolve(),
    commonjs()
    // getBabelOutputPlugin({
    //   plugins: ['@babel/plugin-transform-modules-commonjs']
    //   // presets: ['@babel/preset-env']
    // })
    // babel({
    //   // babelHelpers: 'bundled',
    //   // targets: { esmodules: true },
    //   plugins: ['@babel/plugin-transform-modules-commonjs']
    // })
  ]
};

function transformRequirePlugin(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'transform-code',
    transform(code, id) {
      if (!filter(id)) return;
      console.log('>>>>>>>>>>>>>>>>>>>>>>', id);
      console.log(code);
      // proceed with the transformation...
      return {
        code: code
        // map: generatedSourceMap
      };
    }
  };
}
