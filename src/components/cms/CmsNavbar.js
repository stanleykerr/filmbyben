import { useRef, useState } from "react";

import Link from "next/link";
import styles from "@styles/CmsNavbar.module.scss";
import { useRouter } from "next/router";

const pages = [
  ["Overview", "/cms"],
  ["Integrations", "/cms/sub"],
  ["Showcase", "/showcase"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function CmsNavbar() {
  const [tabBoundingBox, setTabBoundingBox] = useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState(null);
  const [highlightedTab, setHighlightedTab] = useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

  const router = useRouter();

  const repositionHighlight = (e, tab) => {
    setTabBoundingBox(e.target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles = {
    background: "hsl(0 0% 90.9%)",
    position: "absolute",
    top: "9px",
    left: 0,
    borderRadius: "4px",
    height: "32px",
    transition: "0.15s ease",
    transitionProperty: "width, transform, opacity",
  };

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
  }

  // [title, href]

  return (
    <div style={{ background: "white" }}>
      <div className={styles.header}>
        <div className={styles.scope}>test</div>
        <div className={styles.links}>test2</div>
      </div>
      <nav className={styles.menu}>
        <div
          className={styles.menuWrapper}
          ref={wrapperRef}
          onMouseLeave={resetHighlight}
        >
          <div className={styles.menuInner}>
            <div ref={highlightRef} style={highlightStyles} />
            {pages.map(([title, href]) => (
              <div key={href} className={styles.navLinkWrapper}>
                <Link href={href}>
                  <a
                    className={[
                      ...(router.asPath === href ? [styles.active] : []),
                    ].join(" ")}
                    onMouseOver={(ev) => repositionHighlight(ev, href)}
                  >
                    {title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
