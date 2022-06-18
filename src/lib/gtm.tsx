import Script from "next/script";

const CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID!;

interface TagsOptions {
  id: string;
  events?: object;
  dataLayer?: object;
  dataLayerName?: string;
  preview?: string;
  auth?: string;
}

const tags = ({
  id,
  events = {},
  dataLayer: _dataLayer,
  dataLayerName = "dataLayer",
  preview = "",
  auth = "",
}: TagsOptions) => {
  if (!id) throw new Error("GTM ID is required!");

  const gtm_auth = `&gtm_auth=${auth}`,
    gtm_preview = `&gtm_preview=${preview}`,
    noscriptSrc = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`,
    scriptSrc = `
      (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(
          events
        ).slice(1, -1)}});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x';
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','${dataLayerName}','${id}');`;

  return {
    scriptSrc,
    noscriptSrc,
  };
};

export const GTMScript = () => {
  if (!CONTAINER_ID) return null;

  const tagsOptions: TagsOptions = {
    id: CONTAINER_ID,
    events: JSON.parse(process.env.NEXT_PUBLIC_GTM_EVENTS ?? "{}"),
    dataLayer: JSON.parse(process.env.NEXT_PUBLIC_GTM_DATA_LAYER ?? "{}"),
    dataLayerName: process.env.NEXT_PUBLIC_DATA_LAYER_NAME,
    preview: process.env.NEXT_PUBLIC_GTM_PREVIEW,
    auth: process.env.NEXT_PUBLIC_GTM_AUTH,
  };

  const { scriptSrc, noscriptSrc } = tags(tagsOptions);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: scriptSrc,
        }}
      />
      {/* End Google Tag Manager */}
      {/* Google Tag Manager (noscript) */}
      <noscript dangerouslySetInnerHTML={{ __html: noscriptSrc }} />
      {/* End Google Tag Manager (noscript) */}
    </>
  );
};

export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string;
    page: string;
  }

  const pageEvent: PageEventProps = {
    event: "VirtualPageView",
    page: url,
  };

  // @ts-ignore
  window?.dataLayer?.push(pageEvent);
  return pageEvent;
};
