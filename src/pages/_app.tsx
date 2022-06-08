import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { ThemeProvider } from "styled-components";

import Layout from "@/components/Layout";
import { GlobalStyle, theme, themeType, customUnitTheme } from "@/lib/theme";

import "@/lib/font-awesome";

import type { AppPropsWithLayout } from "@/types";

import "inter-ui/inter.css";

// TODO: implement theme type..?
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  /** Use the layout defined at the page level if available (otherwise defaults to {@link Layout}) */
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <GeistProvider themes={[customUnitTheme]} themeType={themeType}>
        <CssBaseline />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </GeistProvider>
    </>
  );
};

export default MyApp;
