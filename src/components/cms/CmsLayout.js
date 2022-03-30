// import "@styles/CmsLayout.module.scss";

import { Page, Spacer, Tabs } from "@geist-ui/core";

import CmsNavbar from "@components/cms/CmsNavbar";
import Container from "@components/Container";

// import styles from "@styles/CmsLayout.module.scss";

export default function CmsLayout({ children }) {
  return (
    <>
      <CmsNavbar />
      <Page dotBackdrop padding={0}>
        {/* <Page.Header></Page.Header> */}
        <Page.Content>{children}</Page.Content>

        {/*  */}
      </Page>

      {/* <style global jsx>{`
        html,
        body {
          background: white;
        }
      `}</style> */}
    </>
  );
}

/* TODO: don't hardcode inner container, let children choose */
{
  /* <div className={styles.page}>
  <main className={styles.main}>
    <Container wrapper full>
      <Container wrapper>
        <Spacer />
        {children}
      </Container>
    </Container>
  </main>
</div>; */
}
