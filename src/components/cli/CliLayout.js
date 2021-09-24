import "@styles/CliLayout.module.scss";

import CliNavbar from "@components/cli/CliNavbar";
import Container from "@components/Container";
import Spacer from "@components/Spacer";
import styles from "@styles/CliLayout.module.scss";

export default function CliLayout({ children }) {
  return (
    <>
      <CliNavbar />
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
