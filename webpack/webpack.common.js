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
const entryPointPath = path.join(rootPath, 'src', 'learnApps', 'index.js');

const outputPath = path.join(publicPath, "js");
const htmlTemplatePath = path.join(publicPath, 'templates', 'index.html');

const commonWebpackConfig = merge(
  {
    entry: entryPointPath,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      filename: "[name].bundle.[contenthash].js",
      publicPath: "/js/",
      path: outputPath,
    },
    plugins: [
      // increase build performance
      new ForkTsCheckerWebpackPlugin(),
      new DefinePlugin({
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: htmlTemplatePath,
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
