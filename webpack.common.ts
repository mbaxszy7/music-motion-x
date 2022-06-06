import * as webpack from "webpack"
import path from "path"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

export const webpaclAlias = {
  "interfaces/*": ["./src/interfaces/*"],
  interfaces: ["./src/interfaces/"],
  "@/*": ["./src/components/*"],
}
export const isSSR = process.env.SSR === "true"
export const isDEV = process.env.NODE_ENV === "development"

export const isCSRDEV = isDEV && !isSSR
export const isSSRDEV = isDEV && isSSR
const isWebpackBuildServer = process.env.BUILD === "server"

export const babelPresets = (env?: "node" | "legacy") => {
  const common: [string, any] = [
    "@babel/preset-env",
    {
      targets: { esmodules: true },
      useBuiltIns: "usage",
      modules: false,
      debug: false,
      bugfixes: true,
      corejs: { version: 3, proposals: true },
    },
  ]
  if (env === "node") {
    common[1].targets = {
      node: "14",
    }
  } else if (env === "legacy") {
    common[1].targets = {
      ios: "9",
      safari: "9",
    }
    common[1].bugfixes = false
  } else {
    common[1].targets = {
      esmodules: true,
    }
  }
  return common
}

const webpackCommonPlugins = isCSRDEV
  ? [
      new webpack.DefinePlugin({
        "process.env.SSR": JSON.stringify(process.env.SSR),
      }),

      new ReactRefreshWebpackPlugin(),
    ]
  : [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.SSR": JSON.stringify(process.env.SSR),
      }),
    ]

export const webpackpPlugins: any[] = [
  ...webpackCommonPlugins,
  !isWebpackBuildServer
    ? new HtmlWebpackPlugin(
        isCSRDEV
          ? {
              title: "music-motion",
              template: path.resolve(__dirname, "index.html"),
            }
          : {
              minify: {
                collapseWhitespace: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
              },
              inject: true,
              template: path.resolve(__dirname, "index.html"),
            },
      )
    : null,
  !isWebpackBuildServer ? new ForkTsCheckerWebpackPlugin() : null,

  !isCSRDEV && new CleanWebpackPlugin(),
].filter((p) => !!p)

export const babelPlugin: string[] = [
  isCSRDEV ? "react-refresh/babel" : "",
].filter((p) => !!p)

export const cssProcessLoaders = [
  {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: !isDEV,
    },
  },
  "postcss-loader",
]
