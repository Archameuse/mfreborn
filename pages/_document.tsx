import  Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
      const originalRenderPage = ctx.renderPage
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => App,
          enhanceComponent: (Component) => Component,
        })
      const initialProps = await Document.getInitialProps(ctx)
      return initialProps
    }
  
    render() {
      return (
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
            href="https://fonts.googleapis.com/css2?family=Merriweather&display=optional"
            rel="stylesheet"
            />
            <link
            href="https://fonts.googleapis.com/css?family=Kelly+Slab&display=optional"
            rel="stylesheet"
            />
            <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=optional"
            rel="stylesheet"
            />
            <link
            href="https://fonts.googleapis.com/css2?family=Cuprum&display=optional"
            rel="stylesheet"
            />
            <link 
            href="https://fonts.googleapis.com/css2?family=Lato&display=optional"
            rel="stylesheet"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument