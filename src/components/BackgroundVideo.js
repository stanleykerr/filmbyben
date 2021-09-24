import styles from "@styles/BackgroundVideo.module.scss";

export default function BackgroundVideo({ src, className, ...props }) {
  const sources = src.map((srcURL, index) => (
    <source key={`bgVideo-${index}`} src={srcURL} />
  ));

  return (
    <div className={[className, styles.bgVideo].join(" ").trim()}>
      {/*<video {...props} autoPlay loop muted playsInline>
        {sources}
  </video>*/}
    </div>
  );
}

function HeroVideo({ src, className, ...props }) {
  return BackgroundVideo({
    src,
    className: [className, styles.hero].join(" ").trim(),
    ...props,
  });
}

BackgroundVideo.Hero = HeroVideo;

/* <Link href={href} passHref>
      <a
        className={[styles.btn, styles.wbtn].join(
          " "
        )}
      >
        {children}
      </a>
    </Link> */
