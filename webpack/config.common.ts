import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { merge } from 'webpack-merge';

import { paths } from './paths';
import { cssRule, fontRule, svgRule, tsRule } from './rules';

const commonConfig = (mode: Configuration['mode']): Configuration => {
  return merge<Configuration>(
    {
      mode,
      output: {
        path: paths.dist,
        publicPath: '/',
      },

      entry: path.join(paths.application, 'src', 'index.tsx'),
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin()],
      },

      plugins: [
        new ProgressPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: paths.public,
              to: paths.dist,
              filter: (filepath) => {
                if (filepath.endsWith('index.html')) {
                  return false;
                }
                return true;
              },
            },
          ],
        }),
        new HtmlWebpackPlugin({
          template: paths.join(paths.public, 'index.html'),
          filename: paths.join(paths.dist, 'index.html'),
          inject: 'body',
        }),
      ],

      stats: {
        colors: true,
      },

      optimization: {
        runtimeChunk: false,
        splitChunks: false,
        usedExports: true,
      },
    },
    fontRule(),
    cssRule(),
    svgRule(),
    tsRule()
  );
};

export { commonConfig };
