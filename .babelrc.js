const presets = [
  // [
  //   '@babel/preset-env',
  //   {
  //     targets: {
  //       node: 'current',
  //     },
  //     useBuiltIns: 'usage',
  //     corejs: '3.8.1',
  //   }
  // ],
  '@babel/preset-env',
  '@babel/preset-react',
];

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  // [
  //   'babel-plugin-module-resolver',
  //   {
  //     root: ['./src/'],
  //   },
  // ],
];

const babelConfig = {
  presets,
  plugins,
};

module.exports = babelConfig;
