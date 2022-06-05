export default function Html({
  assetsCSS,
  assetsJS,
  children,
  title,
  states,
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
        <link rel="shortcut icon" href="favicon.ico" />

        {assetsCSS.map((css: any) => (
          <link
            rel="preload"
            href={Object.values(css)[0] as string}
            key={Object.values(css)[0] as string}
            as="style"
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
        <textarea
          id="data-context"
          style={{ display: "none" }}
          value={JSON.stringify(states)}
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
