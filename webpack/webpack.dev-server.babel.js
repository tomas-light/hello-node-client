import path from 'path';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { cssRule, jsRule, tsRule } from './rules';
import { DefinePlugin } from 'webpack';
import { getEnvConfig } from './getEnvConfig';

const rootPath = path.join(__dirname, '..');
const publicPath = path.resolve(rootPath, 'public');
// const paths = {
//   entryPoint: path.join(rootPath, 'src', 'learnApps', 'index.js'),
//   htmlTemplate: path.join(publicPath, 'templates', 'index.html'),
// };
const paths = {
  entryPoint: path.join(rootPath, 'src', 'buttons', 'index.jsx'),
  htmlTemplate: path.join(publicPath, 'templates', 'buttons.html'),
};

const devWebpackConfig = merge(
  {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: paths.entryPoint,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publicPath,
      port: 3000,
      hot: true,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new DefinePlugin({
        'process.env': JSON.stringify(getEnvConfig()),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: paths.htmlTemplate,
      }),
    ],
  },
  cssRule(),
  jsRule(),
  tsRule(),
);

module.exports = devWebpackConfig;
