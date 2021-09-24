import Link from "next/link";
import styles from "@styles/CliNavbar.module.scss";
import { useRouter } from "next/router";

const pages = [
  ["Overview", "/cli"],
  ["Integrations", "/cli/sub"],
  ["Showcase", "showcase"],
  ["Services", "services"],
  ["About", "about"],
  ["Contact", "contact"],
];

export default function CliNavbar() {
  const router = useRouter();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.scope}>test</div>
        <div className={styles.links}>test2</div>
      </div>
      <nav className={styles.menu}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuInner}>
            {pages.map(([title, href], index) => (
              <div key={index} className={styles.navLinkWrapper}>
                <Link href={href}>
                  <a
                    className={[
                      ...(router.asPath === href ? [styles.active] : []),
                    ].join(" ")}
                  >
                    {title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
