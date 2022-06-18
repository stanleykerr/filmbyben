import { useEffect } from "react";

import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { ThemeProvider } from "styled-components";

import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import { GTMPageView, GTMScript } from "@/lib/gtm";
import { GlobalStyle, theme, themeType, customUnitTheme } from "@/lib/theme";

import "@/lib/font-awesome";

import type { AppPropsWithLayout } from "@/types";

import "inter-ui/inter.css";

// TODO: implement theme type..?
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  /** Use the layout defined at the page level if available (otherwise defaults to {@link Layout}) */
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const router = useRouter();

  /** Fires Google Tag Manager custom page view event ({@link GTMPageView}) */
  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url);

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GTMScript />
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
