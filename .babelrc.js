const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
      useBuiltIns: 'usage',
      corejs: '3.6.5',
    }
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];

const alias = {
};

const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  [
    'babel-plugin-module-resolver',
    {
      root: ['./src/'],
      alias,
    },
  ],
];

const babelConfig = {
  presets,
  plugins,
};

module.exports = babelConfig;
