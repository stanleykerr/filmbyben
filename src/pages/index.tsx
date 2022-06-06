import { useState } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring, easings } from "react-spring";
import styled from "styled-components";

import BackgroundVideo from "@/components/BackgroundVideo";
import Layout from "@/components/Layout";
import SocialLinks from "@/components/SocialLinks";

import type { NextPageWithLayout } from "@/types";
import type { ReactElement } from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Carousel from "@/components/Carousel";

// import SimpleCarousel from "@/components/SimpleCarousel";

// <FontAwesomeIcon icon={["fab", "github"]} />

export interface FollowProps {
  hovered?: boolean;
}

const Follow = styled.div`
  position: fixed;
  inset: auto auto -10px 20px;
  z-index: 5;
  display: flex;
  padding: 20px 20px 30px;
  flex-direction: column;
  align-items: flex-start;
`;

const FollowButton = styled.div`
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
`;

const FollowIconWrapper = styled(animated.div)`
  width: 38px;
`;

const FollowIcon = styled(animated.div)`
  position: relative;
  display: flex;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--swatch_46f8859a);
  color: var(--swatch_59430538);
  transform-origin: center center;
`;

const FollowText = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const FollowLinks = styled(animated.div)`
  display: flex;
  margin-left: -12px;
  flex-wrap: wrap;
  align-items: center;
`;

const Follower = () => {
  const [hovered, setHovered] = useState(false);

  const { width, scaleX, scaleY } = useSpring({
    width: hovered ? 0 : 38,
    scaleX: hovered ? 0 : 1,
    scaleY: hovered ? 0 : 1,
    config: {
      duration: 300,
      easing: easings.easeInOutQuart,
    },
    delay: hovered ? 100 : 0,
  });

  const { height, translateY, opacity } = useSpring({
    height: hovered ? 48 : 0,
    translateY: hovered ? 0 : 16,
    opacity: hovered ? 1 : 0,
    delay: 300,
    config: {
      duration: 300,
      easing: easings.easeInOutBack,
    },
  });

  return (
    <Follow
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FollowButton>
        <FollowIconWrapper style={{ width }} /* hovered={hovered} */>
          <FollowIcon style={{ scaleX, scaleY }} /* hovered={hovered} */>
            <FontAwesomeIcon icon={faPlus} />
          </FollowIcon>
        </FollowIconWrapper>
        <FollowText>Follow</FollowText>
      </FollowButton>
      <FollowLinks
        style={{
          opacity,
          translateY,
          height,
        }}
      >
        <SocialLinks size={48} />
      </FollowLinks>
    </Follow>
  );
};

const Home: NextPageWithLayout = () => (
  <>
    <Follower />
    {<BackgroundVideo src={"/videos/bg/1.webm"} hero />}
    <div
      style={{
        width: "60vw",
        margin: "auto",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {/* <Image
          src={logoFull}
          alt="Picture of the author"
          layout="responsive"
          sizes="60vw"
          priority
        /> */}
    </div>
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
