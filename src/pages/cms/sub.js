import CmsLayout from "@components/cms/CmsLayout";

export default function Sub() {
  return <>test</>;
}

// TODO: fix
// eslint-disable-next-line react/display-name
Sub.getLayout = (page) => <CmsLayout>{page}</CmsLayout>;
