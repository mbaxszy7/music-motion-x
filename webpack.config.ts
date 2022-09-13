import path from "path"
import * as webpack from "webpack"
import "webpack-dev-server"

import {
  webpaclAlias,
  babelPresets,
  isSSRDEV,
  isCSRDEV,
  cssProcessLoaders,
  babelPlugin,
  webpackpPlugins,
} from "./webpack.common"

const APP_PATH = path.resolve(__dirname, "src/client/index.tsx")

const config: webpack.Configuration = {
  target: ["web", "es2017"],
  entry: APP_PATH,
  devtool: isCSRDEV ? "source-map" : "cheap-module-source-map",
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  output: {
    module: true,
    publicPath: isCSRDEV ? "/" : "/public/",
    filename: isCSRDEV
      ? "[name]-[chunkhash].js"
      : isSSRDEV
      ? `[name].js`
      : `[name]-[contenthash].js`,
    chunkFilename: isCSRDEV
      ? "[name]-[chunkhash].js"
      : isSSRDEV
      ? `[name].js`
      : `[name]-[contenthash].js`,
    path: path.resolve(__dirname, isCSRDEV ? "dist-client" : "public-client"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: webpaclAlias,
  },

  devServer: {
    historyApiFallback: true,
    port: 8010,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        options: {
          presets: [
            babelPresets(),
            "@babel/typescript",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
          plugins: babelPlugin,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: cssProcessLoaders,
      },
    ],
  },

  plugins: [...webpackpPlugins],
}

export default config
