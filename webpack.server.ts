// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
// import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import nodeExternals from "webpack-node-externals"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

import path from "path"
import * as webpack from "webpack"
import {
  webpaclAlias,
  babelPresets,
  isCSRDEV,
  isSSRDEV,
  cssProcessLoaders,
  webpackpPlugins,
} from "./webpack.common"

if (isCSRDEV) {
  cssProcessLoaders.unshift("style-loader")
} else {
  cssProcessLoaders.unshift(MiniCssExtractPlugin.loader)
  webpackpPlugins.push(
    new MiniCssExtractPlugin({
      linkType: false,
      runtime: false,
      filename: isSSRDEV ? "[name].css" : "[name]-[contenthash].css",
      chunkFilename: isSSRDEV
        ? "[name].chunk.css"
        : "[name].[contenthash].chunk.css",
      ignoreOrder: true,
    }),
  )
}

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
