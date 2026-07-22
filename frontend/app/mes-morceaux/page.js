"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import styles from "./page.module.css";

// Morceaux de l'utilisateur, tous ensembles confondus
// TODO: remplacer par les vraies données du backend
const MORCEAUX = [
  {
    id: 1,
    titre: "Ave Verum Corpus",
    compositeur: "W. A. Mozart",
    genre: "Sacré",
    genreFond: "var(--sop-bg)",
    genreCouleur: "var(--sop)",
    ensemble: "Chœur du Lac",
    nombreDocuments: 7,
  },
  {
    id: 2,
    titre: "Bohemian Rhapsody",
    compositeur: "Queen · arr. J. Leclerc",
    genre: "Pop",
    genreFond: "var(--alt-bg)",
    genreCouleur: "var(--alt)",
    ensemble: "Chœur du Lac",
    nombreDocuments: 9,
  },
  {
    id: 3,
    titre: "Libertango",
    compositeur: "Astor Piazzolla",
    genre: "Tango",
    genreFond: "var(--ten-bg)",
    genreCouleur: "var(--ten)",
    ensemble: "Petit Ensemble Baroque",
    nombreDocuments: 5,
  },
  {
    id: 4,
    titre: "Hallelujah",
    compositeur: "Leonard Cohen",
    genre: "Variété",
    genreFond: "var(--bas-bg)",
    genreCouleur: "var(--bas)",
    ensemble: "Vocalises du Dimanche",
    nombreDocuments: 6,
  },
  {
    id: 5,
    titre: "O Fortuna",
    compositeur: "Carl Orff",
    genre: "Classique",
    genreFond: "var(--sop-bg)",
    genreCouleur: "var(--sop)",
    ensemble: "Chœur du Lac",
    nombreDocuments: 8,
  },
  {
    id: 6,
    titre: "Vois sur ton chemin",
    compositeur: "Bruno Coulais",
    genre: "Film",
    genreFond: "var(--alt-bg)",
    genreCouleur: "var(--alt)",
    ensemble: "Vocalises du Dimanche",
    nombreDocuments: 4,
  },
];

// Liste des ensembles pour le filtre, sans doublons
const NOMS_ENSEMBLES = [...new Set(MORCEAUX.map((m) => m.ensemble))];
const OPTIONS_FILTRE = ["Tous les ensembles", ...NOMS_ENSEMBLES];

// Page "Mes morceaux" : recherche + filtre par ensemble + grille de fiches
export default function MesMorceaux() {
  const [recherche, setRecherche] = useState("");
  const [ensembleFiltre, setEnsembleFiltre] = useState("Tous les ensembles");
  const [filtreOuvert, setFiltreOuvert] = useState(false);

  // Filtrage local sur les données fictives, aucun appel au backend
  const morceauxFiltres = MORCEAUX.filter((morceau) => {
    const texte = recherche.toLowerCase();
    const correspondRecherche =
      morceau.titre.toLowerCase().includes(texte) ||
      morceau.compositeur.toLowerCase().includes(texte);
    const correspondEnsemble = ensembleFiltre === "Tous les ensembles" || morceau.ensemble === ensembleFiltre;
    return correspondRecherche && correspondEnsemble;
  });

  return (
    <>
      <Header connecte />
      <main>
        <div className={styles.contenu}>
          <div className={styles.enTete}>
            <div>
              <h1 className={styles.titre}>Mes morceaux</h1>
              <p className={styles.sousTitre}>{MORCEAUX.length} fiches · tous ensembles confondus</p>
            </div>
            <div className={styles.boutonNouveau}>
              {/* TODO: ouvrir le formulaire de création de fiche morceau */}
              <Bouton variante="primaire">+ Nouvelle fiche morceau</Bouton>
            </div>
          </div>

          {/* Barre de recherche + filtre par ensemble */}
          <div className={styles.barreOutils}>
            <div className={styles.champRecherche}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un titre, un compositeur…"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className={styles.saisieRecherche}
              />
            </div>

            <div className={styles.filtre}>
              <button
                type="button"
                className={styles.filtreBouton}
                aria-expanded={filtreOuvert}
                onClick={() => setFiltreOuvert(!filtreOuvert)}
              >
                <span className={styles.filtreLibelle}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  {ensembleFiltre}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {filtreOuvert && (
                <div className={styles.filtreMenu}>
                  {OPTIONS_FILTRE.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={option === ensembleFiltre ? styles.filtreOptionActive : styles.filtreOption}
                      onClick={() => {
                        setEnsembleFiltre(option);
                        setFiltreOuvert(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grille des fiches morceaux */}
          {morceauxFiltres.length > 0 ? (
            <div className={styles.grille}>
              {morceauxFiltres.map((morceau) => (
                // TODO: la page de détail (/morceaux/[id]) sera complétée plus tard
                <Link key={morceau.id} href={`/morceaux/${morceau.id}`} className={styles.carte}>
                  <div className={styles.carteHaut}>
                    <span className={styles.carteIcone}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    </span>
                    <span className={styles.carteGenre} style={{ background: morceau.genreFond, color: morceau.genreCouleur }}>
                      {morceau.genre}
                    </span>
                  </div>
                  <h3 className={styles.carteTitre}>{morceau.titre}</h3>
                  <p className={styles.carteCompositeur}>{morceau.compositeur}</p>
                  <div className={styles.carteBas}>
                    <span className={styles.carteEnsemble}>{morceau.ensemble}</span>
                    <span className={styles.carteDocuments}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      </svg>
                      {morceau.nombreDocuments} documents
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.aucunResultat}>Aucun morceau ne correspond à votre recherche.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
