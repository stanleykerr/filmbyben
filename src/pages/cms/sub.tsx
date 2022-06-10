import CmsLayout from "@/components/cms/CmsLayout";

import type { NextPageWithLayout } from "@/types";

const Sub: NextPageWithLayout = () => {
  return <>test</>;
};

Sub.getLayout = (page) => <CmsLayout>{page}</CmsLayout>;

export default Sub;
