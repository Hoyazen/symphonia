import Link from "next/link";
import Logo from "./Logo";
import Bouton from "./Bouton";
import styles from "./Header.module.css";

// En-tête affiché sur toutes les pages
export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.marque}>
        <Logo />
        Symphonia
      </Link>

      <nav className={styles.nav}>
        <Link href="/tableau-de-bord" className={styles.lien}>Tableau de bord</Link>
        <Link href="/mes-morceaux" className={styles.lien}>Mes morceaux</Link>
      </nav>

      <div className={styles.actions}>
        <Bouton href="/connexion" variante="ghost">Se connecter</Bouton>
        <Bouton href="/inscription" variante="primaire">S'inscrire</Bouton>
      </div>
    </header>
  );
}
