import DetailedLayout from "@/components/DetailedLayout";
import HeroSection from "@/components/HeroSection";

import type { NextPageWithLayout } from "@/types";
import type { ReactElement } from "react";

import bgImg from "@/public/img/red-cam.png";

const Quote: NextPageWithLayout = () => (
  <>
    <HeroSection background={bgImg}>Request a Consultation</HeroSection>
  </>
);

Quote.getLayout = (page: ReactElement) => (
  <DetailedLayout>{page}</DetailedLayout>
);

export default Quote;
