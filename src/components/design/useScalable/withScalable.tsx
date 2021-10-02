import { DefaultTheme, useTheme } from "styled-components";
import {
  DynamicLayoutPipe,
  GetScalablePropsFunction,
  ScalableConfig,
  ScalableContext,
  ScalableProps,
} from "./ScalableContext";
import React, { forwardRef } from "react";

import { isCSSNumberValue } from "../utils/collections";

// import useTheme from "../use-theme";

const reduceScaleCoefficient = (scale: number) => {
  if (scale === 1) return scale;
  const diff = Math.abs((scale - 1) / 2);
  return scale > 1 ? 1 + diff : 1 - diff;
};

const withScalable = <T, P = {}>(
  Render: React.ComponentType<P & { ref?: React.Ref<T> }>
) => {
  const ScalableFC = forwardRef<T, P & ScalableProps>(
    ({ children, ...props }, ref) => {
      const { layout }: { layout?: any } = useTheme(); // FIXME: handle this properly
      const {
        paddingLeft,
        pl,
        paddingRight,
        pr,
        paddingTop,
        pt,
        paddingBottom,
        pb,
        marginTop,
        mt,
        marginRight,
        mr,
        marginBottom,
        mb,
        marginLeft,
        ml,
        px,
        py,
        mx,
        my,
        width,
        height,
        font,
        w,
        h,
        margin,
        padding,
        unit = layout.unit,
        scale = 1,
      } = props;
      const makeScaleHandler =
        (attrValue: string | number | undefined): DynamicLayoutPipe =>
        (scale1x, defaultValue) => {
          // 0 means disable scale and the default value is 0
          if (scale1x === 0) {
            scale1x = 1;
            defaultValue = defaultValue || 0;
          }
          const factor = reduceScaleCoefficient(scale) * scale1x;
          if (typeof attrValue === "undefined") {
            if (typeof defaultValue !== "undefined") return `${defaultValue}`;
            return `calc(${factor} * ${unit})`;
          }

          if (!isCSSNumberValue(attrValue)) return `${attrValue}`;
          const customFactor = factor * Number(attrValue);
          return `calc(${customFactor} * ${unit})`;
        };
      const getScalableProps: GetScalablePropsFunction = (keyOrKeys) => {
        if (!Array.isArray(keyOrKeys))
          return props[keyOrKeys as keyof ScalableProps];
        let value = undefined;
        for (const key of keyOrKeys) {
          const currentValue = props[key];
          if (typeof currentValue !== "undefined") {
            value = currentValue;
          }
        }
        return value;
      };

      const value: ScalableConfig = {
        unit,
        SCALES: {
          pt: makeScaleHandler(paddingTop ?? pt ?? py ?? padding),
          pr: makeScaleHandler(paddingRight ?? pr ?? px ?? padding),
          pb: makeScaleHandler(paddingBottom ?? pb ?? py ?? padding),
          pl: makeScaleHandler(paddingLeft ?? pl ?? px ?? padding),
          px: makeScaleHandler(
            px ?? paddingLeft ?? paddingRight ?? pl ?? pr ?? padding
          ),
          py: makeScaleHandler(
            py ?? paddingTop ?? paddingBottom ?? pt ?? pb ?? padding
          ),
          mt: makeScaleHandler(marginTop ?? mt ?? my ?? margin),
          mr: makeScaleHandler(marginRight ?? mr ?? mx ?? margin),
          mb: makeScaleHandler(marginBottom ?? mb ?? my ?? margin),
          ml: makeScaleHandler(marginLeft ?? ml ?? mx ?? margin),
          mx: makeScaleHandler(
            mx ?? marginLeft ?? marginRight ?? ml ?? mr ?? margin
          ),
          my: makeScaleHandler(
            my ?? marginTop ?? marginBottom ?? mt ?? mb ?? margin
          ),
          width: makeScaleHandler(width ?? w),
          height: makeScaleHandler(height ?? h),
          font: makeScaleHandler(font),
        },
        getScalableProps,
      };

      return (
        <ScalableContext.Provider value={value}>
          <Render {...(props as P)} ref={ref}>
            {children}
          </Render>
        </ScalableContext.Provider>
      );
    }
  );
  ScalableFC.displayName = `Scalable${Render.displayName || "Wrapper"}`;
  return ScalableFC;
};

export default withScalable;
