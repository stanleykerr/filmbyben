import ButtonMagnet from "@components/ButtonMagnet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/Navbar.module.scss";
import { useState } from "react";

const info = [
  ["twitter", "https://twitter.com/FilmByBen"],
  ["facebook", "https://www.facebook.com/FilmByBen"],
  ["instagram", "https://www.instagram.com/filmbybenvi/"],
  ["youtube", "https://www.youtube.com/channel/UCAuSvQIoFnrkxcg1Jg8Zq7A"],
  ["linkedin", "https://www.linkedin.com/in/benjamin-janes-41b71917b/"],
];

export default function Navbar() {
  const [isOpen, setOpen] = useState(true);
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.brand}>
          <Image
            src="/img/logo.png"
            alt="Picture of the author"
            width={32}
            height={44}
          />
          <div className={styles.logoinfo}>
            <div className={styles.title}>Film by Ben</div>
            <div className={styles.subtitle}>Cinematographer & Film Maker</div>
          </div>
        </a>
      </Link>
      <div className={styles.navigation}>
        <ButtonMagnet href="/quote">Request a Quote</ButtonMagnet>
        <div className={styles.menuIcon} onClick={() => setOpen(!isOpen)}>
          <FontAwesomeIcon icon={["fas", isOpen ? "times" : "bars"]} />
        </div>
      </div>
      <div
        style={{ display: isOpen ? "flex" : "none" }}
        className={styles.navigationOverlay}
      >
        <div className={styles.navWrapper}>
          <div className={styles.navInfo}>
            <h4>Film by Ben</h4>
            <div className={styles.navInfoText}>
              Professional Cinematographer and Film Maker <br />
              based in Las Vegas, Nevada
            </div>
            <a href="mailto:ben@filmbyben.com" className={styles.navInfoLink}>
              ben@filmbyben.com
            </a>
            <a href="tel:+1(770)713-2223" className={styles.navInfoLink}>
              +1 (770) 713-2223
            </a>
            <div className={styles.navFollowText}>Follow me</div>
            <div className={styles.navSocial}>
              {info.map(([icon, href], index) => (
                <a
                  key={index}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                  className={[styles.socialButton, styles[icon]].join(" ")}
                >
                  <FontAwesomeIcon icon={["fab", icon]} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.navLinks}></div>
      </div>
    </div>
  );
}
