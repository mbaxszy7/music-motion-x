export default function Html({
  assetsCSS,
  assetsJS,
  children,
  title,
  states,
  dehydratedState,
}: any) {
  return (
    <html>
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
        {assetsCSS.map((css: any) => (
          <link
            rel="prefetch"
            href={Object.values(css)[0] as string}
            key={Object.values(css)[0] as string}
            as="style"
          />
        ))}

        {assetsJS.map((css: any) => (
          <link
            rel="prefetch"
            href={Object.values(css)[0] as string}
            key={Object.values(css)[0] as string}
            as="script"
          />
        ))}

        {assetsCSS.map((css: any) => (
          <link
            rel="stylesheet"
            href={Object.values(css)[0] as string}
            key={Object.values(css)[0] as string}
          />
        ))}

        <title>{title}</title>
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        <div id="root">{children}</div>
        <div id="modal_root"></div>
        <textarea
          id="data-context"
          style={{ display: "none" }}
          value={JSON.stringify(states)}
          readOnly
        />

        <textarea
          id="data-dehydrated"
          style={{ display: "none" }}
          value={JSON.stringify(dehydratedState)}
          readOnly
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assetsJS)};`,
          }}
        />
      </body>
    </html>
  )
}
