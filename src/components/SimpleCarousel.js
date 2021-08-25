import React, { useEffect, useState } from "react";
import { animated, config, useTransition } from "react-spring";

// FIXME: this shit so confusing ngl https://react-spring.io/hooks/use-transition#you-can-transition-arrays

export default function SimpleCarousel({ children, defaultSlide = 0 }) {
  const [activeSlide, setActiveSlide] = useState(defaultSlide);

  const maxSlides = React.Children.count(children);
  const slides = React.Children.toArray(children);

  console.dir(slides[activeSlide], { depth: null });

  const transitions = useTransition(
    slides[activeSlide],
    /* (item) => {
      console.log("WOOO ", item, slides[activeSlide]);
      return item;
    }, */
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      delay: 1000,
      config: config.molasses,
      //onRest: () => setActiveSlide((activeSlide + 1) % maxSlides),
    }
  );

  useEffect(
    () =>
      void setInterval(
        () => setActiveSlide((state) => (state + 1) % maxSlides),
        2000
      ),
    [maxSlides]
  );

  return transitions((styles, item) => (
    <animated.div style={styles}>{item}</animated.div>
  ));

  /* return transitions.map(({ slide, props, key }) => (
    <animated.div key={key}></animated.div>
  )) */
}
