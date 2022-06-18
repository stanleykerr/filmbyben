import Footer from "@/components/Footer";
import InstagramFeed from "@/components/InstagramFeed";
import Layout from "@/components/Layout";

import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const DetailedLayout = ({ children }: Props) => {
  return (
    <Layout>
      {children}
      <InstagramFeed />
      <Footer />
    </Layout>
  );
};

export default DetailedLayout;
