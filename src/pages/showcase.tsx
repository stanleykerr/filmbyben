import { useEffect, useState, useRef, createRef, RefObject } from "react";

import useResizeAware from "react-resize-aware";
import { animated, useSpring, easings } from "react-spring";
import styled from "styled-components";
import { serialize, deserialize } from "superjson";

import { Work } from "@/lib/db";

import type { NextPageWithLayout } from "@/types";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

type PageProps = {
  works: any;
};

const AppContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const AppInner = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  position: absolute;
`;

const PageHome = styled.div`
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ProjectLoad = styled.div`
  top: 50%;
  z-index: 3;
  right: 120px;
  width: 145px;
  height: 55px;
  display: block;
  margin-top: -10px;
  position: absolute;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  a {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 53px;
    position: absolute;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    transition: border-color 0.3s ease-in-out;
    cursor: pointer;

    :hover {
      border-color: #fff;
      color: #fff;
    }
  }
`;

const TitlesContainer = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  top: 50%;
  z-index: 3;
  left: 120px;
  right: 120px;
  height: 85px;
  position: absolute;
  margin-top: -42.5px;
  pointer-events: none;
`;

const TitlesWrapper = styled(animated.div)`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
`;

const TitleSlide = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  display: block;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const TitleSlideInner = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const VideosContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;

  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      #000000 100%
    );
  }
`;

const ProjectsContainer = styled(animated.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: visible;
  position: absolute;
  transform-origin: 50% 50% !important;
`;

const ProjectsWrapper = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box !important;
`;

const ProjectSlide = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SlideInner = styled.div`
  right: 0;
  bottom: 0;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;

  figure {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    transform-origin: 50% 50% !important;
    margin: 0;
  }
`;

const BackgroundsContainer = styled(animated.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
`;

const BackgroundsWrapper = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
`;

const VideoContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  position: absolute;

  video {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
`;

const Showcase: NextPageWithLayout<PageProps> = ({
  works: _works,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const works: Array<Work> = deserialize(_works) as Work[];

  const [activeSlide, setActiveSlide] = useState(0);
  const [changingSlides, setChangingSlides] = useState(true);
  const maxSlides = works.length;

  const videoRefs = useRef<RefObject<HTMLVideoElement>[]>(
    [...new Array(maxSlides)].map(() => createRef())
  );

  const ref = useRef<RefObject<HTMLDivElement>>();

  const [resizeListener, bounds] = useResizeAware();

  const prevSlideRef = useRef<number>();
  useEffect(() => {
    prevSlideRef.current = activeSlide;
  }, [activeSlide]);

  const [{ translateX, translateY, scaleX, scaleY, opacity }, api] = useSpring(
    () => ({
      immediate: !ref.current,
      key: activeSlide,
      from: {
        scaleX: 1,
        scaleY: 1,
        translateX: -(bounds.width ?? 0) * ((activeSlide - 1) % maxSlides),
        translateY:
          prevSlideRef.current === undefined
            ? 0
            : -85 * ((activeSlide - 1) % maxSlides),
        opacity: 1,
      },
      to: async (next) => {
        if (
          !bounds.width ||
          prevSlideRef.current === undefined ||
          prevSlideRef.current === activeSlide
        )
          return;
        videoRefs.current.forEach((ref) => {
          if (ref.current) {
            ref.current.currentTime = 0;
            ref.current.pause();
          }
        });
        setChangingSlides(false);
        await next({
          opacity: 0.5,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        await next({
          translateX: -(bounds.width ?? 0) * activeSlide,
          translateY: -activeSlide * 85,
        });
        await next({ scaleX: 1, scaleY: 1, opacity: 1 });
        setChangingSlides(true);
      },
      reset: false,
      config: {
        duration: 750,
        easing: easings.easeInOutQuart,
      },
      onRest: () => {
        if (!prevSlideRef.current) return;
        videoRefs.current.forEach((ref, i) => {
          if (i !== activeSlide) {
            ref.current?.pause();
          } else {
            if (ref.current) {
              ref.current.currentTime = 0;
              ref.current.play();
            }
          }
        });
        setTimeout(() => {
          setActiveSlide((activeSlide + 1) % maxSlides);
        }, 5050);
      },
    }),
    [bounds.width, activeSlide]
  );

  useEffect(() => {
    if (!prevSlideRef.current) {
      setTimeout(() => {
        videoRefs.current
          .filter((_, i) => i === activeSlide)
          .forEach((ref) => ref.current?.play());

        setTimeout(() => {
          setActiveSlide((activeSlide + 1) % maxSlides);
        }, 5050);
      }, 100);
    }
  }, [activeSlide, maxSlides, api, videoRefs]);

  useEffect(() => {
    if (videoRefs.current) {
      videoRefs.current.forEach((ref) => {
        ref?.current?.load();
        ref?.current?.pause();
      });
    }
  }, [videoRefs]);

  const previewVideos = works.map((work, index) => {
    return (
      <ProjectSlide key={index}>
        <SlideInner>
          <figure
            style={{
              backgroundImage: `url(https://cdn.gimme.top/fbb/${work.id}-preview.webp)`,
              opacity: changingSlides ? 0 : 1,
              filter: "blur(8px)",
            }}
          />
        </SlideInner>
      </ProjectSlide>
    );
  });

  const previewBackgrounds = works.map((work, index) => {
    return (
      <ProjectSlide key={index}>
        <SlideInner>
          <VideoContainer>
            <video
              ref={videoRefs.current[index]}
              preload="none"
              loop
              muted
              playsInline
            >
              <source
                src={`https://cdn.gimme.top/fbb/${work.id}-preview.webm`}
              />
            </video>
          </VideoContainer>
        </SlideInner>
      </ProjectSlide>
    );
  });

  return (
    <>
      <style jsx global>{`
        html,
        body {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <AppContainer ref={ref.current}>
        <AppInner>
          <PageHome>
            <ProjectLoad>
              {works && works[activeSlide].link && (
                <a
                  href={works[activeSlide].link!}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project
                </a>
              )}
            </ProjectLoad>
            <TitlesContainer>
              <TitlesWrapper style={{ translateY }}>
                {works.map((work, index) => (
                  <TitleSlide key={index}>
                    <TitleSlideInner>
                      <h2
                        style={{
                          position: "relative",
                          display: "inline-block",
                          fontSize: "4.5em",
                          fontWeight: 600,
                          margin: 0,
                          height: 85,
                          lineHeight: "85px",
                          // textTransform: "uppercase",
                        }}
                      >
                        {work.name}
                      </h2>
                    </TitleSlideInner>
                  </TitleSlide>
                ))}
              </TitlesWrapper>
            </TitlesContainer>
            <VideosContainer>
              <ProjectsContainer
                style={{
                  scaleX,
                  scaleY,
                }}
              >
                <ProjectsWrapper style={{ translateX }}>
                  {resizeListener}
                  {previewVideos}
                </ProjectsWrapper>
              </ProjectsContainer>
              <BackgroundsContainer style={{ opacity }}>
                <BackgroundsWrapper style={{ translateX }}>
                  {previewBackgrounds}
                </BackgroundsWrapper>
              </BackgroundsContainer>
            </VideosContainer>
          </PageHome>
        </AppInner>
      </AppContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  PageProps
> = async ({}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  const data = await Work.findAll({
    where: {
      hasPreview: true,
    },
  });

  if (!data || data.length === 0) {
    return {
      props: {
        works: [],
      },
    };
  }

  const works = serialize(data.map((work) => work.get({ plain: true })));
  return {
    props: { works }, // will be passed to the page component as props
  };
};

export default Showcase;
