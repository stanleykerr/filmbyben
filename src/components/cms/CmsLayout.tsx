import { ReactNode } from "react";

import { Page, Spacer } from "@geist-ui/core";

import CmsNavbar from "@/components/cms/CmsNavbar";
import Container from "@/components/Container";

interface Props {
  children: ReactNode;
}

const CmsLayout = ({ children }: Props) => {
  return (
    <>
      <CmsNavbar />
      <Page dotBackdrop style={{ width: "unset", padding: 0 }}>
        {/* <Page.Header></Page.Header> */}
        <Page.Content style={{ width: "unset", padding: 0 }}>
          <Container
            full
            style={{
              minHeight: "calc(100vh - 85px)",
            }}
          >
            <Container>
              <Spacer />
              {children}
            </Container>
          </Container>
        </Page.Content>
      </Page>

      <style global jsx>{`
        *,
        :after,
        :before,
        html {
          box-sizing: border-box;
        }

        #__next {
          position: relative;
          z-index: 0;
          overflow-x: unset;
        }
      `}</style>
    </>
  );
};

export default CmsLayout;
