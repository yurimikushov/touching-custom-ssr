import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import path from 'path'
import commonConfig from './common.webpack.config'

const ROOT = process.cwd()
const IS_DEV = process.env.NODE_ENV === 'development'

const config: Configuration = merge(commonConfig, {
  entry: path.join(ROOT, 'src', 'client.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(ROOT, 'build/client'),
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
      template: path.join(ROOT, 'src', 'index.html'),
      publicPath: 'client',
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

export default config
