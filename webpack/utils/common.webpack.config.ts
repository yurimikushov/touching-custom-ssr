import { Configuration, ProvidePlugin } from 'webpack'

const IS_DEV = process.env.NODE_ENV === 'development'

const getCommonConfig = (): Configuration => {
  return {
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: IS_DEV ? 'inline-source-map' : 'source-map',
    plugins: [
      new ProvidePlugin({
        React: 'react',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },
  }
}

export { getCommonConfig }
