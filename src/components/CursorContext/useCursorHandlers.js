import { useCallback, useContext } from "react";

import { CursorContext } from "./CursorContextProvider";
import isTouchDevice from "./isTouchDevice";

const useCursorHandlers = (options = {}) => {
  const [, setCursor] = useContext(CursorContext);

  const onMouseEnter = useCallback(
    (event) => {
      if (options.onMouseEnter) {
        options.onMouseEnter(event);
      }
      toggleCursor();
    },
    [options, toggleCursor]
  );

  const onMouseLeave = useCallback(
    (event) => {
      if (options.onMouseLeave) {
        options.onMouseLeave(event);
      }
      toggleCursor();
    },
    [options, toggleCursor]
  );

  const toggleCursor = useCallback(() => {
    setCursor(({ active }) => ({ active: !active }));
  }, [setCursor]);

  return isTouchDevice ? options : { onMouseEnter, onMouseLeave };
};

export { useCursorHandlers };
