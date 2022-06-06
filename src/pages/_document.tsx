import { CssBaseline } from "@geist-ui/core";
import { ServerStyleSheet } from "styled-components";

import Document from "next/document";

import type { DocumentContext } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const styles = CssBaseline.flush(); // @geist-ui

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [initialProps.styles, styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
