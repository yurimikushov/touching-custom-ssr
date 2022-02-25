import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import commonConfig from './common.webpack.config'

const ROOT = process.cwd()

const config: Configuration = merge(commonConfig, {
  entry: path.join(ROOT, 'src', 'server.tsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(ROOT, 'build'),
    // clean: true,
  },
  target: 'node',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/views', to: 'views' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: 'null-loader',
      },
    ],
  },
})

export default config
