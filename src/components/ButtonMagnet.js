/* import Image from "next/image";
import Link from "next/link";
import styles from "@styles/Navbar.module.scss"; */

import Link from "next/link";
import styles from "@styles/ButtonMagnet.module.scss";

// import { useCursorHandlers } from "./CursorContext/useCursorHandlers";

// FIXME: add the "magnet" functionality
// https://medium.com/@jaredloson/custom-javascript-cursor-in-react-d7ffefb2db38
// https://gist.github.com/jaredloson/3f0142f1040470b4f83d2e495a7ce5fd

export default function ButtonMagnet({ children, href }) {
  // const cursorHandlers = useCursorHandlers();

  return (
    <Link href={href} passHref>
      <a
        className={[styles.btn, styles.wbtn].join(
          " "
        )} /* {...cursorHandlers} */
      >
        {children}
      </a>
    </Link>
  );
}
