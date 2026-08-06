"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import styles from "./Header.module.css";

// Utilisateur affiché quand l'en-tête est en mode "connecté"
// TODO: remplacer par les vraies données de l'utilisateur connecté (backend)
const MOCK_USER = { firstName: "Claire", initials: "CD" };

const AUTHENTICATED_LINKS = [
  { href: "/tableau-de-bord", label: "Tableau de bord" },
  { href: "/mes-morceaux", label: "Mes morceaux" },
];

// En-tête affiché sur toutes les pages, avec menu burger sur mobile.
// "connecte" bascule entre l'en-tête visiteur (Se connecter/S'inscrire)
// et l'en-tête d'un utilisateur connecté (navigation + profil).
export default function Header({ authenticated = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // "Mes morceaux" reste actif sur une fiche morceau, "Tableau de bord" sur une fiche ensemble
  function isActive(href) {
    if (href === "/mes-morceaux") {
      return pathname === href || pathname.startsWith("/morceaux/");
    }
    if (href === "/tableau-de-bord") {
      return pathname === href || pathname.startsWith("/ensembles/");
    }
    return pathname === href;
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <Link href={authenticated ? "/tableau-de-bord" : "/"} className={styles.brand}>
          <Logo size={32} />
          ymphonia
        </Link>

        {authenticated && (
          <nav className={styles.authenticatedNav}>
            {AUTHENTICATED_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? styles.activeNavLink : styles.navLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className={styles.rightSide}>
        {authenticated ? (
          <>
            {/* Bouton profil : décoratif pour l'instant */}
            {/* TODO: menu déroulant du profil (paramètres, déconnexion...) */}
            <button type="button" className={styles.profile}>
              <span className={styles.avatar}>{MOCK_USER.initials}</span>
              <span className={styles.userName}>{MOCK_USER.firstName}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <span className={styles.mobileAvatar}>{MOCK_USER.initials}</span>
          </>
        ) : (
          <div className={styles.actions}>
            <Link href="/connexion" className={styles.loginButton}>Se connecter</Link>
            <Link href="/inscription" className={styles.registrationButton}>S&apos;inscrire</Link>
          </div>
        )}

        {/* Bouton menu, visible seulement sur mobile */}
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu déroulant mobile */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {authenticated ? (
            AUTHENTICATED_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? styles.activeNavLink : styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))
          ) : (
            <>
              <Link href="/connexion" className={styles.loginButton} onClick={() => setMenuOpen(false)}>
                Se connecter
              </Link>
              <Link href="/inscription" className={styles.registrationButton} onClick={() => setMenuOpen(false)}>
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
