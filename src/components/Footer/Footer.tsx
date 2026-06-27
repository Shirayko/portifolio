import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.border} aria-hidden="true" />
      <div className={styles.content}>
        <p>© 2026 — PORTFOLIO P4</p>
        <p className={styles.quote}>
          &ldquo;A verdade está além do véu da névoa.&rdquo;
        </p>
      </div>
    </footer>
  );
}
