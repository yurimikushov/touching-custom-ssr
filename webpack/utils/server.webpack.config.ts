import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import LoadablePlugin from '@loadable/webpack-plugin'
import path from 'path'
import { getCommonConfig } from './common.webpack.config'

const ROOT = process.cwd()

const getServerConfig = (dirPath = ''): Configuration => {
  return merge(getCommonConfig(), {
    entry: path.join(ROOT, 'src', 'server.tsx'),
    output: {
      filename: '[name].js',
      path: path.resolve(ROOT, 'build', dirPath),
      // clean: true,
    },
    target: 'node',
    // @ts-expect-error bad tying
    plugins: [new LoadablePlugin()],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: 'null-loader',
        },
      ],
    },
  })
}

export { getServerConfig }
