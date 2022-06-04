import Image from "next/image";
import { ReactElement } from "react";

import BackgroundVideo from "@components/BackgroundVideo";
import Layout from "@components/Layout";

import logoFull from "@public/img/logo-full.png";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Carousel from "@components/Carousel";

// import SimpleCarousel from "@components/SimpleCarousel";

// <FontAwesomeIcon icon={["fab", "github"]} />

export default function Home() {
  return (
    <>
      <BackgroundVideo src={["/videos/bg/1.webm", "/videos/1.mp4"]} hero />
      <div
        style={{
          width: "40vw",
          margin: "auto",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <Image
          src={logoFull}
          alt="Picture of the author"
          layout="responsive"
          sizes="40vw"
          priority
          placeholder="blur"
        />
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
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
