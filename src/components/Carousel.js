import { animated, useSpring } from "react-spring";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import styles from "@/styles/Carousel.module.scss";

// import PropTypes from "prop-types";

// TODO: See https://medium.com/unibuddy-technology-blog/compound-components-in-react-b04772f9eb58

const CarouselContext = createContext();

export default function Carousel({ children, defaultSlide = 0 }) {
  const [activeSlide, setActiveSlide] = useState(defaultSlide);
  const setSlide = useCallback(
    (value) => setActiveSlide(() => (activeSlide === value ? "" : value)),
    [setActiveSlide, activeSlide]
  );

  const value = useMemo(
    () => ({
      activeSlide,
      setSlide,
      defaultSlide,
    }),
    [setSlide, activeSlide, defaultSlide]
  );

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <CarouselContext.Provider value={value}>
      <animated.div style={props}>{children}</animated.div>
    </CarouselContext.Provider>
  );
}

export function useSlideContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "Extracting context w/o wrapping component w/ Carousel Provider!"
    );
  }
  return context;
}

function Slide({ value, children }) {
  const { activeSlide, setSlide } = useSlideContext();

  return <div className="SLIDE">{children}</div>;
}

Carousel.Slide = Slide;
