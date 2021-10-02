import { TabsConfig, TabsContext, TabsHeaderItem } from "./TabsContext";
import { useEffect, useMemo, useState } from "react";
import useScalable, { withScalable } from "@components/design/useScalable";

import styled from "styled-components";

interface Props {
  initialValue?: string;
  value?: string;
  hideDivider?: boolean;
  onChange?: (val: string) => void;
  className?: string;
}

const defaultProps = {
  className: "",
  hideDivider: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TabsProps = Props & NativeAttrs;

// FIXME: this is probably a super hacky getaround but yolo? it works for now, idk if i want to add scales into the actual props object & idrc
const TabsContainer = styled.div<TabsProps & { scales: any }>(({ scales }) => ({
  fontSize: scales.font(1),
  width: scales.width(1, "initial"),
  height: scales.height(1, "auto"),
  padding: `${scales.pt(0)} ${scales.pr(0)} ${scales.pb(0)} ${scales.pl(0)}`,
  margin: `${scales.mt(0)} ${scales.mr(0)} ${scales.mb(0)} ${scales.ml(0)}`,
}));

const Header = styled.header`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-y: hidden;
  overflow-x: scroll;
  scrollbar-width: none;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollContainer = styled.div<TabsProps>`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 1px solid
    ${({ hideDivider, theme }) =>
      hideDivider ? "transparent" : theme.palette.border};
`;

const Content = styled.div`
  padding-top: 0.625rem;
`;

const TabsComponent: React.FC<React.PropsWithChildren<TabsProps>> = ({
  initialValue: userCustomInitialValue,
  value,
  hideDivider,
  children,
  onChange,
  className,
  ...props
}: React.PropsWithChildren<TabsProps> & typeof defaultProps) => {
  const { SCALES } = useScalable();
  const [selfValue, setSelfValue] = useState<string | undefined>(
    userCustomInitialValue
  );
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([]);

  const register = (next: TabsHeaderItem) => {
    setTabs((last) => {
      const hasItem = last.find((item) => item.value === next.value);
      if (!hasItem) return [...last, next];
      return last.map((item) => {
        if (item.value !== next.value) return item;
        return {
          ...item,
          ...next,
        };
      });
    });
  };

  const initialValue = useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: selfValue,
      inGroup: true,
    }),
    [selfValue]
  );

  useEffect(() => {
    if (typeof value === "undefined") return;
    setSelfValue(value);
  }, [value]);

  const clickHandler = (value: string) => {
    setSelfValue(value);
    // props.onChange?.(value);
    onChange && onChange(value);
  };

  return (
    <TabsContext.Provider value={initialValue}>
      <TabsContainer scales={SCALES} {...props}>
        <Header>
          <ScrollContainer hideDivider={hideDivider}>
            {tabs.map(({ cell: Cell, value }) => (
              <Cell key={value} value={selfValue} onClick={clickHandler} />
            ))}
          </ScrollContainer>
        </Header>
        <Content>{children}</Content>
      </TabsContainer>
    </TabsContext.Provider>
  );
};

TabsComponent.defaultProps = defaultProps;
TabsComponent.displayName = "DangoTabs";
const Tabs = withScalable(TabsComponent);
export default Tabs;
