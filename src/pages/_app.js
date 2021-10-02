import "@styles/globals.scss";
import "@lib/font-awesome";

import { ThemeProvider, createGlobalStyle } from "styled-components";

// import CursorContextProvider from "@components/CursorContext/CursorContextProvider";

// TODO: use default Layout as fallback
// import Layout from "@components/layout";

// TODO: actually implement this stuff correctly *facepalm* this is terribly frankenstein'd
export const defaultBreakpoints = {
  xs: {
    min: "0",
    max: "650px",
  },
  sm: {
    min: "650px",
    max: "900px",
  },
  md: {
    min: "900px",
    max: "1280px",
  },
  lg: {
    min: "1280px",
    max: "1920px",
  },
  xl: {
    min: "1920px",
    max: "10000px",
  },
};

const GlobalStyle = createGlobalStyle`
  
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
  palette: {
    accents_1: "#fafafa",
    accents_2: "#eaeaea",
    accents_3: "#999",
    accents_4: "#888",
    accents_5: "#666",
    accents_6: "#444",
    accents_7: "#333",
    accents_8: "#111",
    background: "#fff",
    foreground: "#000",
    selection: "#79ffe1",
    secondary: "#666",
    code: "#f81ce5",
    border: "#eaeaea",
    error: "#e00",
    errorLight: "#ff1a1a",
    errorLighter: "#f7d4d6",
    errorDark: "#c50000",
    success: "#0070f3",
    successLight: "#3291ff",
    successLighter: "#d3e5ff",
    successDark: "#0761d1",
    warning: "#f5a623",
    warningLight: "#f7b955",
    warningLighter: "#ffefcf",
    warningDark: "#ab570a",
    cyan: "#50e3c2",
    cyanLighter: "#aaffec",
    cyanLight: "#79ffe1",
    cyanDark: "#29bc9b",
    violet: "#7928ca",
    violetLighter: "#e3d7fc",
    violetLight: "#8a63d2",
    violetDark: "#4c2889",
    purple: "#f81ce5",
    alert: "#ff0080",
    magenta: "#eb367f",
    link: "#0070f3",
  },
  layout: {
    gap: "16pt",
    gapNegative: "-16pt",
    gapHalf: "8pt",
    gapHalfNegative: "-8pt",
    gapQuarter: "4pt",
    gapQuarterNegative: "-4pt",
    pageMargin: "16pt",
    pageWidth: "750pt",
    pageWidthWithMargin: "782pt",
    breakpointMobile: defaultBreakpoints.xs.max,
    breakpointTablet: defaultBreakpoints.sm.max,
    radius: "5px",
    unit: "16px",
  },
};

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
