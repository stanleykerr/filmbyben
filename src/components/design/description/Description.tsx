import React, { ReactNode } from "react";
import useScalable, { withScalable } from "@components/design/useScalable";

import styled from "styled-components";

interface Props {
  title?: ReactNode | string;
  content?: ReactNode | string;
  className?: string;
}

const defaultProps = {
  title: "Title" as ReactNode | string,
  content: "" as ReactNode | string,
  className: "",
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type DescriptionProps = Props & NativeAttrs;

// FIXME: this is a workaround! need to learn more about the actual cause to fix this
const DescriptionWrapper = styled.dl<DescriptionProps & { scales?: any }>(
  ({ scales }) => ({
    fontSize: scales.font(1),
    width: scales.width(1, "auto"),
    height: scales.height(1, "auto"),
    padding: `${scales.pt(0)} ${scales.pr(0)} ${scales.pb(0)} ${scales.pl(0)}`,
    margin: `${scales.mt(0)} ${scales.mr(0)} ${scales.mb(0)} ${scales.ml(0)}`,
  })
);

const Title = styled.dt`
  font-size: 0.75em;
  line-height: 1em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.accents_5};
  font-weight: 500;
  display: flex;

  & :global(p) {
    margin: 0;
  }
`;

const Content = styled.dd`
  font-size: 0.875em;
  margin: 0;
  line-height: 1.1em;
  color: ${({ theme }) => theme.palette.foreground};
  font-weight: 500;

  & :global(p) {
    margin: 0;
  }
`;
const DescriptionComponent: React.FC<DescriptionProps> = ({
  title,
  content,
  ...props
}: DescriptionProps & typeof defaultProps) => {
  const { SCALES } = useScalable();

  return (
    <DescriptionWrapper scales={SCALES} {...props}>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </DescriptionWrapper>
  );
};

DescriptionComponent.defaultProps = defaultProps;
DescriptionComponent.displayName = "DangoDescription";
const Description = withScalable(DescriptionComponent);
export default Description;
