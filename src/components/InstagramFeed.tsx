import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import useSWR from "swr";

import { useMagneticBase } from "@/components/useMagnetic";

import type { InstagramMedia } from "../types";

const InstagramFeedWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  width: 100%;
  padding: 0px;
  justify-content: center;
  align-items: stretch;
  grid-auto-columns: 1fr;
  gap: 0px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
`;

const InstagramPostWrapper = styled.a`
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 50%;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  color: var(--swatch_46f8859a);
  max-width: 100%;
`;

const InstagramOverlayWrapper = styled(animated.div)`
  position: absolute;
  inset: 0%;
  z-index: 2;
  display: flex;
  padding: 6%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--swatch_95d63a07);

  will-change: opacity;
`;

const InstagramOverlay = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;

  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  line-height: 1;
`;

const InstagramPhoto = styled(animated.img)`
  position: absolute;
  z-index: 1;
  display: block;
  width: 105%;
  height: 105%;
  max-width: none;
  margin: -2.5%;
  object-fit: cover;

  will-change: transform;
`;

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

const InstagramPost = ({ post }: { post: InstagramMedia }) => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);

  const { offset, ...magnetHandlers } = useMagneticBase({
    onMouseLeave,
  });

  const { scaleX, scaleY, opacity } = useSpring({
    scaleX: hovered ? 1.04 : 1,
    scaleY: hovered ? 1.04 : 1,
    opacity: hovered ? 1 : 0,
  });

  return (
    <InstagramPostWrapper
      href={post.permalink}
      target="_blank"
      onMouseEnter={onMouseEnter}
      {...magnetHandlers}
    >
      <InstagramOverlayWrapper style={{ opacity }}>
        <InstagramOverlay
          style={{
            transition: "transform 50ms ease",
            transform: `translate(${offset.x * 2}%, ${offset.y * 2}%)`,
          }}
        >
          <span style={{ fontSize: 9 }}>View on</span>
          <span style={{ fontSize: 16 }}>Instagram</span>
          <FontAwesomeIcon icon={["fab", "instagram"]} size={"2x"} />
        </InstagramOverlay>
      </InstagramOverlayWrapper>
      <InstagramPhoto
        src={post.thumbnail_url}
        style={{
          transition: "transform 50ms ease",
          transform: `translate(${offset.x * -2}%, ${offset.y * -2}%)`,
          scaleX,
          scaleY,
        }}
      />
    </InstagramPostWrapper>
  );
};

const InstagramFeed = () => {
  const { data, error } = useSWR("/api/instagram", fetcher);

  if (error || !data) return null;

  const { posts }: { posts: InstagramMedia[] } = data;

  const feedPosts = posts.map((post) => (
    <InstagramPost key={post.id} post={post} />
  ));

  return <InstagramFeedWrapper>{feedPosts}</InstagramFeedWrapper>;
};

export default InstagramFeed;
