import Logo from "./Logo";
import styles from "./Footer.module.css";

// Pied de page affiché sur toutes les pages
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Logo size={28} />
        ymphonia
      </div>

      <div className={styles.links}>
        <a href="#">À propos</a> · <a href="#">Confidentialité</a> · <a href="#">Contact</a>
      </div>

      <span className={styles.copyright}>© 2026 Symphonia</span>
    </footer>
  );
}
