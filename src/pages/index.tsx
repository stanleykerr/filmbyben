import styled from "styled-components";

import Image from "next/image";

import BackgroundVideo from "@/components/BackgroundVideo";
import Follow from "@/components/Follow";
import Layout from "@/components/Layout";

import type { NextPageWithLayout } from "@/types";
import type { ReactElement } from "react";

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
  </>
);

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
