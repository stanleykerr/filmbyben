import Link from "next/link";

import styles from "@styles/ButtonMagnet.module.scss";

export default function ButtonMagnet({ children, href }) {
  return (
    <Link href={href} passHref>
      <a className={[styles.btn, styles.wbtn].join(" ")}>{children}</a>
    </Link>
  );
}
