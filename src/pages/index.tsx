import styled from "styled-components";

import Image from "next/image";

import BackgroundVideo from "@/components/BackgroundVideo";
import Follow from "@/components/Follow";
import Layout from "@/components/Layout";

import type { NextPageWithLayout } from "@/types";
import type { ReactElement } from "react";

// import Carousel from "@/components/Carousel";

// import SimpleCarousel from "@/components/SimpleCarousel";

import logoFull from "@/public/img/logo-full.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Home: NextPageWithLayout = () => (
  <>
    <Follow />
    {<BackgroundVideo src={"/videos/bg/1.webm"} hero />}
    <LogoWrapper>
      <div style={{ width: "40%" }}>
        <Image
          src={logoFull}
          alt="Picture of the author"
          layout="responsive"
          sizes="40vw"
          priority
        />
      </div>
    </LogoWrapper>
    {/* <SimpleCarousel>
        <BackgroundVideo hero
          src={["/videos/bg/1.mp4", "/videos/bg/1.webm"]}
        />
        <BackgroundVideo hero
          id={1}
          src={["/videos/bg/2.mp4", "/videos/bg/2.webm"]}
        />
      </SimpleCarousel> */}
    {/* <Carousel defaultSlide={0}>
        <Carousel.Slide>
          <BackgroundVideo hero
            src={["/videos/bg/1.mp4", "/videos/bg/1.webm"]}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <BackgroundVideo hero
            src={["/videos/bg/2.mp4", "/videos/bg/2.webm"]}
          />
        </Carousel.Slide>
      </Carousel> */}
  </>
);

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
