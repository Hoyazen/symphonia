"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import styles from "./Header.module.css";

// Utilisateur affiché quand l'en-tête est en mode "connecté"
// TODO: remplacer par les vraies données de l'utilisateur connecté (backend)
const UTILISATEUR_FICTIF = { prenom: "Claire", initiales: "CD" };

const LIENS_CONNECTE = [
  { href: "/tableau-de-bord", label: "Tableau de bord" },
  { href: "/mes-morceaux", label: "Mes morceaux" },
];

// En-tête affiché sur toutes les pages, avec menu burger sur mobile.
// "connecte" bascule entre l'en-tête visiteur (Se connecter/S'inscrire)
// et l'en-tête d'un utilisateur connecté (navigation + profil).
export default function Header({ connecte = false }) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pathname = usePathname();

  // "Mes morceaux" reste actif sur une fiche morceau, "Tableau de bord" sur une fiche ensemble
  function estActif(href) {
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
      <div className={styles.groupeGauche}>
        <Link href={connecte ? "/tableau-de-bord" : "/"} className={styles.marque}>
          <Logo taille={32} />
          Symphonia by AD et Maxii
        </Link>

        {connecte && (
          <nav className={styles.navConnecte}>
            {LIENS_CONNECTE.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className={estActif(lien.href) ? styles.lienNavActif : styles.lienNav}
              >
                {lien.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className={styles.droite}>
        {connecte ? (
          <>
            {/* Bouton profil : décoratif pour l'instant */}
            {/* TODO: menu déroulant du profil (paramètres, déconnexion...) */}
            <button type="button" className={styles.profil}>
              <span className={styles.avatar}>{UTILISATEUR_FICTIF.initiales}</span>
              <span className={styles.nomUtilisateur}>{UTILISATEUR_FICTIF.prenom}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <span className={styles.avatarMobile}>{UTILISATEUR_FICTIF.initiales}</span>
          </>
        ) : (
          <div className={styles.actions}>
            <Link href="/connexion" className={styles.btnConnexion}>Se connecter</Link>
            <Link href="/inscription" className={styles.btnInscription}>S&apos;inscrire</Link>
          </div>
        )}

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
      </div>

      {/* Menu déroulant mobile */}
      {menuOuvert && (
        <div className={styles.menuMobile}>
          {connecte ? (
            LIENS_CONNECTE.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className={estActif(lien.href) ? styles.lienNavActif : styles.lienNav}
                onClick={() => setMenuOuvert(false)}
              >
                {lien.label}
              </Link>
            ))
          ) : (
            <>
              <Link href="/connexion" className={styles.btnConnexion} onClick={() => setMenuOuvert(false)}>
                Se connecter
              </Link>
              <Link href="/inscription" className={styles.btnInscription} onClick={() => setMenuOuvert(false)}>
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
