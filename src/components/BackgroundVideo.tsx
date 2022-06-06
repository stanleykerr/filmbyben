import styled from "styled-components";

/**
 * The props type for [[`BackgroundVideo`]].
 */
export interface BackgroundVideoProps {
  /** Source(s) of video */
  src: string | string[];

  /** Whether the video should be displayed as a hero (blurred) */
  hero?: boolean;
}

const BackgroundVideoComp = styled.div<Pick<BackgroundVideoProps, "hero">>`
  position: absolute;
  display: inline-block;
  overflow: visible;
  width: 100vw;
  height: 100vh;

  ${(props) =>
    props.hero &&
    "filter: brightness(80%) contrast(130%) blur(8px) grayscale(50%);"}

  video {
    background-size: cover;
    background-position: 50% 50%;
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    right: -100%;
    bottom: -100%;
    top: -100%;
    left: -100%;
    object-fit: cover;
    z-index: -100;
  }
`;

/**
 * This component is used to display a video as a background image.
 *
 *
 * @example
 * ```tsx
 * <BackgroundVideo src="video.webm" />
 * ```
 *
 * @example
 * ```tsx
 * <BackgroundVideo src={["video.webm", "video.mp4"]} hero />
 * ```
 *
 * @category Component
 */
const BackgroundVideo = ({ src, ...props }: BackgroundVideoProps) => {
  const sources = (typeof src === "string" ? [src] : src).map(
    (srcURL, index) => <source key={`bgVideo-${index}`} src={srcURL} />
  );

  return (
    <BackgroundVideoComp {...props}>
      <video autoPlay loop muted playsInline>
        {sources}
      </video>
    </BackgroundVideoComp>
  );
};

export default BackgroundVideo;
