import path from 'path';
import { DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { cssRule, jsRule, tsRule } from './rules';

const rootPath = path.join(__dirname, '..');
const publicPath = path.join(rootPath, 'public');

const commonWebpackConfig = merge(
  {
    entry: {
      // learn: path.join(rootPath, 'src', 'learnApps', 'index.js'),
      buttons: path.join(rootPath, 'src', 'buttons', 'index.jsx'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      filename: '[name].js',
      publicPath: '/js/',
      path: path.join(publicPath, 'js'),
    },
    plugins: [
      // increase build performance
      new ForkTsCheckerWebpackPlugin(),
      new DefinePlugin({}),
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //   inject: 'body',
      //   template: path.join(publicPath, 'templates', 'index.html'),
      //   filename: path.join(publicPath, 'index.html'),
      // }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: path.join(publicPath, 'templates', 'buttons.html'),
        filename: path.join(publicPath, 'index.html'),
      }),
      new ManifestPlugin(),
      new WebpackBar({}),
    ],
  },
  cssRule(),
  jsRule(),
  tsRule(),
);

module.exports = commonWebpackConfig;
