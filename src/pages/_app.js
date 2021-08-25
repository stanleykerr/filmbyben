import "@styles/globals.scss";
import "@lib/font-awesome";

// import CursorContextProvider from "@components/CursorContext/CursorContextProvider";

// TODO: use default Layout as fallback
// import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
