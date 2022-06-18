import styled from "styled-components";

import Navbar from "@/components/Navbar";

import type { ReactNode } from "react";

const PageWrapper = styled.div`
  position: relative;
  overflow: visible;
  min-height: 100vh;
`;

export interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <style global jsx>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        background: black;
        --swatch_46f8859a: white;
        --swatch_59430538: hsla(220, 6.38%, 9.22%, 1);
        --swatch_129385a2: hsla(225, 5.41%, 14.51%, 1);
        --swatch_92603192: hsla(220, 6.38%, 9.22%, 0.8);
        --swatch_95d63a07: hsla(220, 6.38%, 9.22%, 0.6);
        --swatch_f1153330: hsla(220, 6.38%, 9.22%, 0.4);
        --swatch_9928c545: hsla(220, 6.38%, 9.22%, 0.2);
        --swatch_88916155: hsla(36.2667, 100%, 55.88%, 1);
        --swatch_9f705c6b: hsla(18.9637, 64.71%, 49.79%, 1);
        --swatch_a887fcc2: hsla(353.299, 86.78%, 55.49%, 1);
        --swatch_f4c6e65c: hsla(0, 0%, 100%, 0.5);
        --swatch_3726b468: hsla(0, 0%, 100%, 0.4);
        --swatch_d3053aea: hsla(0, 0%, 100%, 0.3);
        --swatch_2108a87b: hsla(0, 0%, 100%, 0.2);
        --swatch_d4a2cf80: hsla(0, 0%, 100%, 0.12);
        --swatch_d04c3f48: hsla(203.333, 86.84%, 55.29%, 1);
        --swatch_b62759e6: hsla(220.645, 44.08%, 41.37%, 1);
        --swatch_da1f4f49: hsla(351.243, 92.96%, 60.98%, 1);
        --swatch_95201f90: hsla(194.712, 83.2%, 50.98%, 1);
        --swatch_f764de5d: hsla(356.234, 97.55%, 51.96%, 1);
        --swatch_6197ece5: hsla(215.586, 62.77%, 45.29%, 1);
        background-color: var(--swatch_59430538);
        // font-family: Inter; // TODO: use Inter font
        color: white;
        font-size: 15px;
        line-height: 24px;
      }
    `}</style>
    <Navbar />
    <PageWrapper>{children}</PageWrapper>
  </>
);

export default Layout;
