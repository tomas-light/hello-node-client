import path from 'path';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { DefinePlugin } from 'webpack';

import { cssRule, jsRule, tsRule } from './rules';
import { getEnvVariables } from './getEnvVariables';

const rootPath = path.join(__dirname, '..');
const publicPath = path.resolve(rootPath, 'public');
const paths = {
  entryPoint: path.join(rootPath, 'src', 'index.tsx'),
  env: path.join(rootPath, '.env.dev-server'),
  htmlTemplate: path.join(publicPath, 'templates', 'index.html'),
  favicon: path.join(publicPath, 'images', 'favicons', 'favicon.svg'),
}

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
      new CleanWebpackPlugin(),
      new DefinePlugin({
        'process.env': getEnvVariables(paths.env),
      }),
      new HtmlWebPackPlugin({
        template: paths.htmlTemplate,
        favicon: paths.favicon,
      }),
    ],
  },
  cssRule(),
  jsRule(),
  tsRule(),
);

module.exports = devWebpackConfig;
