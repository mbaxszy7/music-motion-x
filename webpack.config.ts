import MiniCssExtractPlugin from "mini-css-extract-plugin"

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

// const isPROSSR = isSSR

const APP_PATH = path.resolve(__dirname, "src/client/index.tsx")

if (isCSRDEV) {
  cssProcessLoaders.unshift("style-loader")
} else {
  cssProcessLoaders.unshift(MiniCssExtractPlugin.loader)
  webpackpPlugins.push(
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: isSSRDEV ? "[name].css" : "[name]-[contenthash].css",
      chunkFilename: isSSRDEV
        ? "[name].chunk.css"
        : "[name].[contenthash].chunk.css",
      ignoreOrder: true,
    }),
  )
}

const config: webpack.Configuration = {
  target: ["web", "es6"],
  entry: APP_PATH,
  devtool: isCSRDEV ? "source-map" : "cheap-module-source-map",
  output: {
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
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: cssProcessLoaders,
      },
    ],
  },

  plugins: webpackpPlugins,
}

export default config
