import "@styles/CmsLayout.module.scss";

import CmsNavbar from "@components/cms/CmsNavbar";
import Container from "@components/Container";
import { Spacer } from "@geist-ui/react";
import styles from "@styles/CmsLayout.module.scss";

export default function CmsLayout({ children }) {
  return (
    <>
      <CmsNavbar />
      <div className={styles.page}>
        <main className={styles.main}>
          <Container wrapper full>
            {/* TODO: don't hardcode inner container, let children choose */}
            <Container wrapper>
              <Spacer />
              {children}
            </Container>
          </Container>
        </main>
      </div>
      <style global jsx>{`
        html,
        body {
          background: white;
        }
      `}</style>
    </>
  );
}
