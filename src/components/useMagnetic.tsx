import { useCallback, useState } from "react";

import { isMobile } from "react-device-detect";

import type { MouseEvent } from "react";

interface Options {
  amount?: number;
  onMouseMove?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
}

const useMagnetic = (options: Options = {}) => {
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (options.onMouseMove) {
        options.onMouseMove(event);
      }

      const { clientX, clientY, currentTarget } = event,
        { top, left, width, height } = currentTarget.getBoundingClientRect();

      setOffset({
        x: ((clientX - left) / width) * 2 - 1,
        y: ((clientY - top) / height) * 2 - 1,
      });
    },
    [options, setOffset]
  );

  const onMouseLeave = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (options.onMouseLeave) {
        options.onMouseLeave(event);
      }

      setOffset({ x: 0, y: 0 });
    },
    [options, setOffset]
  );

  const amount = options.amount ?? 8;

  return isMobile
    ? { options, style: {} }
    : {
        onMouseMove,
        onMouseLeave,
        style: {
          transform: `translate(${offset.x * amount}px, ${
            offset.y * amount
          }px)`,
        },
      };
};

export default useMagnetic;
