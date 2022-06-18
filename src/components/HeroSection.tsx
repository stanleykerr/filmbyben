import styled from "styled-components";

import Image from "next/image";

import Section from "@/components/Section";

import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

const HeroSectionWrapper = styled(Section)`
  overflow: hidden;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  flex-flow: column nowrap;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  color: white;
`;

const HeroSectionInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  margin: 0px auto;
  padding-top: 2vw;
  padding-right: 16px;
  padding-left: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeroSectionHeading = styled.h1`
  position: relative;
  z-index: 2;
  display: flex;
  margin-top: -46px;
  margin-bottom: 2vw;
  justify-content: center;
  align-items: center;
  align-self: auto;
  font-size: 8vw;
  line-height: 8vw;
  text-align: center;
  letter-spacing: 0.5vw;
  text-transform: uppercase;
  object-fit: fill;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  inset: 0px;
  z-index: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  flex: 0 1 auto;
  object-fit: cover;

  display: block;
  opacity: 1;
`;

interface Props {
  children?: ReactNode;
  background: string | StaticImageData;
}

const HeroSection = ({ children, background }: Props) => {
  return (
    <HeroSectionWrapper>
      <HeroSectionInner>
        <HeroSectionHeading>{children}</HeroSectionHeading>
      </HeroSectionInner>
      <BackgroundImage
        src={background}
        alt=""
        placeholder="blur"
        layout="fill"
        objectFit="cover"
      />
    </HeroSectionWrapper>
  );
};

export default HeroSection;
