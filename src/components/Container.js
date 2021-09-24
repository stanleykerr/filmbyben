import styles from "@styles/Container.module.scss";

export default function Container({ wrapper = true, full = false, children }) {
  return (
    <div
      className={[
        ...(wrapper ? [styles.wrapper] : []),
        ...(full ? [styles.full] : []),
      ].join(" ")}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
}
