import resolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const config = {
  input: 'src/index.js',
  external: ['ms'],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    babel({
      exclude: ['node_modules/**'],
      runtimeHelpers: true,
      plugins: [
        '@babel/plugin-transform-runtime',
      ]
    })
  ]
};

export default [
  {
    ...config,
    output: { file: pkg.umd, format: 'umd', name: 'fetchManager' },
    plugins: [
      resolve(),
      commonJs(),
    ],
  },
  {
    ...config,
  }
];
