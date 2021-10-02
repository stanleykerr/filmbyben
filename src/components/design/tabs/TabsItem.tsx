import React, { useEffect, useMemo } from "react";
import { TabsInternalCellProps, useTabsContext } from "./TabsContext";
import useScalable, { withScalable } from "@components/design/useScalable";

import styled from "styled-components";

interface Props {
  label: string | React.ReactNode;
  value: string;
  disabled?: boolean;
}

const defaultProps = {
  disabled: false,
  active: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TabsItemProps = Props & NativeAttrs;

// FIXME: this is super hacky! need to figure out a better way to do this. (this is a very incomplete fix)
type StyledProps = TabsItemProps & {
  active?: any;
  scales?: any;
  theme?: any;
};

const Tab = styled.div<StyledProps>`
  box-sizing: border-box;
  cursor: pointer;
  outline: 0;
  transition: all 200ms ease;
  text-transform: capitalize;
  white-space: nowrap;
  color: ${({ active, theme }) =>
    active ? theme.palette.foreground : theme.palette.accents_6};
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;
  line-height: 1.25em;

  ${({ scales }) =>
    scales &&
    `
    font-size: ${scales.font(1)};
    width: ${scales.width(1, "auto")};
    height: ${scales.height(1, "auto")};
    padding: ${scales.pt(0.334)} ${scales.pr(0.218)} ${scales.pb(
      0.334
    )} ${scales.pl(0.218)};
    margin: ${scales.mt(0)} ${scales.mr(0.5334)} ${scales.mb(0)} ${scales.ml(
      0.5334
    )};
  `}

  /*  */

  &:after {
    position: absolute;
    content: "";
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    transition: all 200ms ease;

    background-color: ${({ active, theme }) =>
      active ? theme.palette.foreground : "transparent"};
    transform: scaleX(${({ active }) => (active ? 1 : 0.75)});
  }

  & :global(svg) {
    max-height: 1em;
    margin-right: 5px;
  }

  &:first-of-type {
    margin-left: 0;
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    color: ${theme.palette.accents_3};
    cursor: not-allowed;
  `}
`;

const TabsItemComponent: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  children,
  value,
  label,
  disabled,
}: React.PropsWithChildren<TabsItemProps> & typeof defaultProps) => {
  // const theme = useTheme()
  const { SCALES } = useScalable();
  const { register, currentValue } = useTabsContext();
  const isActive = useMemo(() => currentValue === value, [currentValue, value]);

  const TabsInternalCell: React.FC<TabsInternalCellProps> = ({
    value: currentValue,
    onClick,
  }) => {
    const clickHandler = () => {
      if (disabled) return;
      onClick && onClick(value);
    };
    return (
      <Tab
        active={value === currentValue}
        disabled={disabled}
        role="button"
        key={value}
        onClick={clickHandler}
        scales={SCALES}
      >
        {label}
      </Tab>
    );
  };
  TabsInternalCell.displayName = "DangoTabsInternalCell";

  useEffect(() => {
    register && register({ value, cell: TabsInternalCell });
  }, [value, label, disabled, TabsInternalCell]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null;
};

TabsItemComponent.defaultProps = defaultProps;
TabsItemComponent.displayName = "DangoTabsItem";
const TabsItem = withScalable(TabsItemComponent);
export default TabsItem;
/* eslint-enable */
