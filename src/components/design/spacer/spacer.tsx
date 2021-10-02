import useScalable, { withScalable } from "../useScalable";

import React from "react";
import styled from "styled-components";

interface Props {
  inline?: boolean;
  className?: string;
  scales?: any;
}

const defaultProps = {
  inline: false,
  className: "",
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type SpacerProps = Props & NativeAttrs;

const SpacerWrapper = styled.span<SpacerProps>(({ inline, scales }) => ({
  display: inline ? "inline-block" : "block",
  width: scales.width(1),
  height: scales.height(1),
  padding: `${scales.pt(0)} ${scales.pr(0)} ${scales.pb(0)} ${scales.pl(0)}`,
  margin: `${scales.mt(0)} ${scales.mr(0)} ${scales.mb(0)} ${scales.ml(0)}`,
}));

const SpacerComponent: React.FC<SpacerProps> = ({
  inline,
  ...props
}: SpacerProps & typeof defaultProps) => {
  const { SCALES } = useScalable();

  return <SpacerWrapper aria-hidden="true" scales={SCALES} {...props} />;
};

SpacerComponent.defaultProps = defaultProps;
SpacerComponent.displayName = "DangoSpacer";
const Spacer = withScalable(SpacerComponent);
export default Spacer;
