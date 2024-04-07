// webpack
import path from 'path'
import { fileURLToPath } from 'url'
import StatsPlugin from 'stats-webpack-plugin' // バンドルサイズ解析のため
import TerserPlugin from 'terser-webpack-plugin' // サイズ縮小プラグイン

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcPath = path.join(__dirname, 'src')
const releasePath = path.join(__dirname, 'release')

// @ts-ignore
process.noDeprecation = true

// [args] --mode=(production|development)
const mode_ = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'

export default {
  mode: mode_,
  target: ['web', 'es2015'],
  devtool: 'source-map',
  entry: {
    nako_gen_simple: [path.join(srcPath, 'nako_gen_simple.mjs')]
  },
  output: {
    path: releasePath,
    enabledLibraryTypes: ['module'],
    module: true,
    library: {
      type: 'module'
    },
    filename: '[name].js'
  },

  plugins: [
    new StatsPlugin('stats.json', { chunkModules: true }, null) // バンドルサイズ解析
  ],

  module: {
    rules: [
      // .js file
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [srcPath]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.webpack.mjs', '.webpack.js', '.web.js', '.js', '.mjs'],
    mainFields: ['browser', 'main', 'module']
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()]
  },
  experiments: {
    outputModule: true
  }
}
