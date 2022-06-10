import React, { useEffect, useState } from "react";

import { animated, useTransition, easings } from "react-spring";

interface Options {
  children: React.ReactNode;
  defaultSlide: number;
}

const SimpleCarousel = ({ children, defaultSlide = 0 }: Options) => {
  const [activeSlide, setActiveSlide] = useState(defaultSlide);

  const maxSlides = React.Children.count(children);
  const slides = React.Children.toArray(children);

  console.dir(slides[activeSlide], { depth: null });

  const transitions = useTransition(slides[activeSlide], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 1000,
    config: {
      duration: 5000,
      easing: easings.easeInOutQuart,
    },
    onRest: () => setActiveSlide((activeSlide + 1) % maxSlides),
  });

  useEffect(() => {
    const interval = setInterval(
      () => setActiveSlide((state) => (state + 1) % maxSlides),
      6000
    );

    return () => clearInterval(interval);
  }, [maxSlides]);

  return transitions((styles, item) => (
    <animated.div style={styles}>{item}</animated.div>
  ));
};

export default SimpleCarousel;
