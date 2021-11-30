import { ScalableProps } from "./ScalableContext";

export type ScalablePropsAndInvalid = keyof ScalableProps | "size";

export const ScalablePropKeys: Array<ScalablePropsAndInvalid> = [
  "paddingLeft",
  "pl",
  "paddingRight",
  "pr",
  "paddingTop",
  "pt",
  "paddingBottom",
  "pb",
  "marginTop",
  "mt",
  "marginRight",
  "mr",
  "marginBottom",
  "mb",
  "marginLeft",
  "ml",
  "px",
  "py",
  "mx",
  "my",
  "width",
  "height",
  "font",
  "unit",
  "scale",
  "size",
];

export const filterScalableProps = <T extends Record<any, any>>(props: T) => {
  const keys = Object.keys(props).filter((key) => key !== "");
  const nextProps: any = {};
  for (const key of keys) {
    if (!(ScalablePropKeys as string[]).includes(key)) {
      nextProps[key] = props[key];
    }
  }
  return nextProps as Omit<T, ScalablePropsAndInvalid>;
};
