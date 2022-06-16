// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
// import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import nodeExternals from "webpack-node-externals"

import path from "path"
import * as webpack from "webpack"
import {
  webpaclAlias,
  babelPresets,
  isCSRDEV,
  cssProcessLoaders,
  webpackpPlugins,
  babelPlugin,
} from "./webpack.common"

const APP_PATH = path.resolve(__dirname, "./src/server/index.ts")

const config: webpack.Configuration = {
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals()],

  entry: APP_PATH,

  output: {
    publicPath: isCSRDEV ? "/" : "/public/",
    filename: "server.app.js",
    path: path.resolve(__dirname, "public"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: webpaclAlias,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        options: {
          presets: [
            babelPresets("node"),
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

  plugins: webpackpPlugins,

  optimization: {
    splitChunks: false,
  },
}

export default config
