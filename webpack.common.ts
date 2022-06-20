import * as webpack from "webpack"
import path from "path"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WorkboxPlugin from "workbox-webpack-plugin"
import WebpackPwaManifest from "webpack-pwa-manifest"
import CopyPlugin from "copy-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { version } from "./package.json"

const webpaclAlias = {
  "@": path.resolve(__dirname, "src"),
}
export const isSSR = process.env.SSR === "true"
export const isDEV = process.env.NODE_ENV === "development"

export const isCSRDEV = isDEV && !isSSR
export const isSSRDEV = isDEV && isSSR

const isWebpackBuildServer = process.env.BUILD === "server"

const babelPresets = (env?: "node" | "legacy") => {
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

const webpackPlugins = () => {
  const webpackCommonPlugins = isCSRDEV
    ? [
        new webpack.DefinePlugin({
          "process.env.SSR": JSON.stringify(process.env.SSR),
          __VERSION__: JSON.stringify(version).replaceAll(".", "-"),
        }),
        new ReactRefreshWebpackPlugin(),
      ]
    : [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          "process.env.SSR": JSON.stringify(process.env.SSR),
          __VERSION__: JSON.stringify(version).replaceAll(".", "-"),
        }),
      ]

  const webpackpPlugins: any[] = [
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

  if (!isCSRDEV) {
    const mincssOptions = {
      filename: isSSRDEV ? "[name].css" : "[name]-[contenthash].css",
      chunkFilename: isSSRDEV
        ? "[name].chunk.css"
        : "[name].[contenthash].chunk.css",
      ignoreOrder: true,
    }
    webpackpPlugins.push(
      new MiniCssExtractPlugin(
        !isWebpackBuildServer
          ? {
              linkType: "text/css",
              ...mincssOptions,
            }
          : { linkType: false, runtime: false, ...mincssOptions },
      ),
    )
  }

  if (!isWebpackBuildServer) {
    !isDEV &&
      webpackpPlugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.join(process.cwd(), "./src/src-service-worker.js"),
          swDest: "service-worker.js",
          exclude: [
            /\.map$/,
            /manifest$/,
            /\.htaccess$/,
            /service-worker\.js$/,
            /\.webp$/,
          ],
        }),
        new WebpackPwaManifest({
          name: "pika-music",
          short_name: "pika-music",
          description: "A PWA Music Web Site",
          display: "standalone",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#FEDD27",
          inject: true,
          fingerprints: false,
          ios: true,
          scope: "/",
          icons: [
            {
              src: path.resolve(
                __dirname,
                "./src/assets/pika_tail_192x192.png",
              ),
              sizes: [192, 192],
              type: "image/png",
              ios: true,
            },
            {
              src: path.resolve(
                __dirname,
                "./src/assets/pika_tail_512x512.png",
              ),
              sizes: [512, 512],
              type: "image/png",
              ios: true,
            },
            {
              src: path.resolve(
                __dirname,
                "./src/assets/pika_tail_152x152.png",
              ),
              sizes: [152, 152],
              type: "image/png",
              ios: true,
            },
          ],
        }),
      )

    webpackpPlugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./src/assets/favicon.ico",
            to: "./favicon.ico",
          },
        ],
      }),
    )
  }

  return webpackpPlugins
}

const cssProcessLoader = () => {
  const cssProcessLoaders = [
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        sourceMap: !isDEV,
      },
    },
    "postcss-loader",
  ]
  if (isCSRDEV) {
    cssProcessLoaders.unshift("style-loader")
  } else {
    cssProcessLoaders.unshift(MiniCssExtractPlugin.loader)
  }
  return cssProcessLoaders
}

const babelPlugin: any[] = [
  isCSRDEV ? "react-refresh/babel" : "",
  !isDEV
    ? ["transform-remove-console", { exclude: ["error", "warn", "info"] }]
    : "",
].filter((p) => !!p)

const webpackpPlugins = webpackPlugins()

const cssProcessLoaders = cssProcessLoader()

export {
  cssProcessLoaders,
  webpackpPlugins,
  babelPlugin,
  babelPresets,
  webpaclAlias,
}
