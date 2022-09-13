// export default function Html({
//   assetsCSS,
//   assetsJS,
//   children,
//   states,
//   dehydratedState,
//   helmetContext,
// }: any) {
//   //
//   // console.log("helmet", helmet, helmetContext)
//   // // const htmlAttrs = helmet.htmlAttributes.toComponent()
//   // // const bodyAttrs = helmet.bodyAttributes.toComponent()
//   // // console.log(helmet.title.toComponent())
//   // return (
//   // )
// }

export const getEndTemplate = ({ state, dehydratedState }: any) => {
  return `</div>
  <div id="modal_root"></div>
  <textarea
    id="data-context"
    style='display:none'
    readonly
  >${JSON.stringify(state)}</textarea>

  <textarea
    id="data-dehydrated"
    style='display:none'
    readonly
  >${JSON.stringify(dehydratedState)}</textarea>
</body>
</html>`
}

export const getStartTemplate = ({
  assetsCSS,
  assetsJS,
  helmetContext,
}: any) => {
  const helmet = helmetContext.helmet
  return `
  <html lang="zh-cn">
  <head>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1"
    />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <meta name="apple-mobile-web-app-title" content="Pika" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="theme-color" content="#FEDD27" />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/public/icon_152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/public/icon_152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="512x512"
      href="/public/icon_512x512.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="512x512"
      href="/public/icon_512x512.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="192x192"
      href="/public/icon_192x192.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="192x192"
      href="/public/icon_192x192.png"
    />
    <link rel="shortcut icon" href="/public/favicon.ico" />
    <link rel="manifest" href="/public/manifest.json" />
    ${assetsCSS.reduce(
      (acc: string, css: any) =>
        acc +
        ` <link
    rel="preload"
    href=${Object.values(css)[0] as string}
    as="style"
    data-tag="css-preload"
  />`,
      "",
    )}

    ${assetsJS.reduce(
      (acc: string, js: any) =>
        acc +
        ` <link
    rel="prefetch"
    href=${Object.values(js)[0] as string}
    as="script"
    data-tag="js-prefetch"
  />`,
      "",
    )}

   
    ${assetsCSS.reduce(
      (acc: string, css: any) =>
        acc +
        ` <link
        rel="stylesheet"
    href=${Object.values(css)[0] as string}
    data-tag="css-real"
  />`,
      "",
    )}
  

    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()} 

  </head>
  <body>
    <noscript><b>Enable JavaScript to run this app.</b></noscript>

   <div id="root">`
}
