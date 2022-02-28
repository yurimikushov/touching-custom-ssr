import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import path from 'path'
import { getCommonConfig } from './common.webpack.config'

const ROOT = process.cwd()
const IS_DEV = process.env.NODE_ENV === 'development'

const getClientConfig = (
  target: 'csr' | 'ssr',
  dirPath = ''
): Configuration => {
  return merge(getCommonConfig(), {
    entry: path.join(
      ROOT,
      'src',
      target === 'ssr' ? 'hydrate.tsx' : 'render.tsx'
    ),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(ROOT, 'build', dirPath),
      // clean: true,
    },
    target: 'web',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimize: !IS_DEV,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: target === 'ssr' ? 'Rendered by SSR' : 'Rendered by CSR',
        template: path.join(ROOT, 'src', 'index.html'),
        publicPath: dirPath,
        minify: !IS_DEV,
      }),
      ...(IS_DEV
        ? []
        : [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
          ],
        },
      ],
    },
  })
}

export { getClientConfig }
