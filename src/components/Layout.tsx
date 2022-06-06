import Navbar from "@/components/Navbar";

import type { ReactNode } from "react";

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
        --swatch_f4c6e65c: hsla(0, 0%, 100%, 0.5);
        --swatch_88916155: hsla(36.2667, 100%, 55.88%, 1);
        --swatch_46f8859a: white;
        --swatch_59430538: hsla(220, 6.38%, 9.22%, 1);
        background-color: var(--swatch_59430538);
        // font-family: Inter; // TODO: use Inter font
        color: white;
        font-size: 15px;
        line-height: 24px;
      }
    `}</style>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
