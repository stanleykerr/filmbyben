import styled from "styled-components";

import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  wrapper?: boolean;
  full?: boolean;
}

type StyleProps = Omit<Props, "children">;

const Wrapper = styled.div<StyleProps>`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  width: ${(props) =>
    props.full
      ? "calc(100vw - (100vw - 100%))" // NOTE: not sure if this calculation is necessary
      : props.theme.layout.pageWidthWithMargin};
  padding-left: ${(props) => (props.full ? 0 : props.theme.layout.pageMargin)};
  padding-right: ${(props) => (props.full ? 0 : props.theme.layout.pageMargin)};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 1px;
  max-width: 100%;

  // TODO: use variables if using Container class, instead of defining here
  --flex: 1;
  --justify-content: flex-start;
  --align-items: stretch;

  flex: var(--flex);
  justify-content: var(--justify-content);
  align-items: var(--align-items);
`;

/**
 * TODO: we don't always want to use this wrapper,
 * not sure if we should just remove it entirely or wrap in "empty" div so full param can be used?
 *
 * Reasoning for this confusion is hacky nature of original implementation:
 * ```tsx
 * export default function Container({ wrapper = true, full = false, children }) {
 *   return (
 *     <div
 *       className={[
 *         ...(wrapper ? [styles.wrapper] : []),
 *         ...(full ? [styles.full] : []),
 *       ].join(" ")}
 *     >
 *       <div className={styles.container}>{children}</div>
 *     </div>
 *   );
 * }
 * ```
 * @example
 * ```tsx
 * <Container full>
 *   Hello world
 * </Container>
 * ```
 *
 * @category Component
 */
const Container = ({ children, ...rest }: Props) => (
  <Wrapper {...rest}>
    <InnerContainer>{children}</InnerContainer>
  </Wrapper>
);

export default Container;
