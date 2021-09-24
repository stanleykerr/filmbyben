import BackgroundVideo from "@components/BackgroundVideo";
import Image from "next/image";
import Layout from "@components/Layout";
import logoFull from "@public/img/logo-full.png";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Carousel from "@components/Carousel";

// import SimpleCarousel from "@components/SimpleCarousel";

// import styles from "@styles/Home.module.css";

// <FontAwesomeIcon icon={["fab", "github"]} />

export default function Home() {
  return (
    <>
      <BackgroundVideo.Hero
        src={["/img/backgroundvideo1.mp4", "/img/backgroundvideo1.webm"]}
      />
      <div
        style={{
          width: "40vw",
          margin: "auto",
          position: "fixed !important",
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
          /* placeholder="blur"
        priority */
        />
      </div>
      {/* <SimpleCarousel>
        <BackgroundVideo.Hero
          src={["/img/backgroundvideo1.mp4", "/img/backgroundvideo1.webm"]}
        />
        <BackgroundVideo.Hero
          id={1}
          src={["/img/backgroundvideo2.mp4", "/img/backgroundvideo2.webm"]}
        />
      </SimpleCarousel> */}
      {/* <Carousel defaultSlide={0}>
        <Carousel.Slide>
          <BackgroundVideo.Hero
            src={["/img/backgroundvideo1.mp4", "/img/backgroundvideo1.webm"]}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <BackgroundVideo.Hero
            src={["/img/backgroundvideo2.mp4", "/img/backgroundvideo2.webm"]}
          />
        </Carousel.Slide>
      </Carousel> */}
    </>
  );
}

// TODO: fix
// eslint-disable-next-line react/display-name
Home.getLayout = (page) => <Layout>{page}</Layout>;
