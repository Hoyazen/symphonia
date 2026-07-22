"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import styles from "./Header.module.css";

// En-tête affiché sur toutes les pages, avec menu burger sur mobile
export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.marque}>
        <Logo taille={32} />
        Symphonia
      </Link>

      {/* Actions visibles directement sur tablette et bureau */}
      <div className={styles.actions}>
        <Link href="/connexion" className={styles.btnConnexion}>Se connecter</Link>
        <Link href="/inscription" className={styles.btnInscription}>S&apos;inscrire</Link>
      </div>

      {/* Bouton menu, visible seulement sur mobile */}
      <button
        type="button"
        className={styles.btnMenu}
        aria-label="Menu"
        aria-expanded={menuOuvert}
        onClick={() => setMenuOuvert(!menuOuvert)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu déroulant mobile, avec les mêmes actions */}
      {menuOuvert && (
        <div className={styles.menuMobile}>
          <Link href="/connexion" className={styles.btnConnexion} onClick={() => setMenuOuvert(false)}>
            Se connecter
          </Link>
          <Link href="/inscription" className={styles.btnInscription} onClick={() => setMenuOuvert(false)}>
            S&apos;inscrire
          </Link>
        </div>
      )}
    </header>
  );
}
