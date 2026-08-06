"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SongCard from "@/components/SongCard";
import styles from "./page.module.css";

// Morceaux de l'utilisateur, tous ensembles confondus
// TODO: remplacer par les vraies données du backend
const SONGS = [
  {
    id: 1,
    title: "Ave Verum Corpus",
    composer: "W. A. Mozart",
    genre: "Sacré",
    genreBackground: "var(--sop-bg)",
    genreColor: "var(--sop)",
    ensemble: "Chœur du Lac",
    documentCount: 7,
  },
  {
    id: 2,
    title: "Bohemian Rhapsody",
    composer: "Queen · arr. J. Leclerc",
    genre: "Pop",
    genreBackground: "var(--alt-bg)",
    genreColor: "var(--alt)",
    ensemble: "Chœur du Lac",
    documentCount: 9,
  },
  {
    id: 3,
    title: "Libertango",
    composer: "Astor Piazzolla",
    genre: "Tango",
    genreBackground: "var(--ten-bg)",
    genreColor: "var(--ten)",
    ensemble: "Petit Ensemble Baroque",
    documentCount: 5,
  },
  {
    id: 4,
    title: "Hallelujah",
    composer: "Leonard Cohen",
    genre: "Variété",
    genreBackground: "var(--bass-bg)",
    genreColor: "var(--bass)",
    ensemble: "Vocalises du Dimanche",
    documentCount: 6,
  },
  {
    id: 5,
    title: "O Fortuna",
    composer: "Carl Orff",
    genre: "Classique",
    genreBackground: "var(--sop-bg)",
    genreColor: "var(--sop)",
    ensemble: "Chœur du Lac",
    documentCount: 8,
  },
  {
    id: 6,
    title: "Vois sur ton chemin",
    composer: "Bruno Coulais",
    genre: "Film",
    genreBackground: "var(--alt-bg)",
    genreColor: "var(--alt)",
    ensemble: "Vocalises du Dimanche",
    documentCount: 4,
  },
];

// Liste des ensembles pour le filtre, sans doublons
const ENSEMBLE_NAMES = [...new Set(SONGS.map((m) => m.ensemble))];
const FILTER_OPTIONS = ["Tous les ensembles", ...ENSEMBLE_NAMES];

// Page "Mes morceaux" : recherche + filtre par ensemble + grille de fiches
export default function MySongsPage() {
  const [search, setSearch] = useState("");
  const [ensembleFilter, setEnsembleFilter] = useState("Tous les ensembles");
  const [filterOpen, setFilterOpen] = useState(false);

  // Filtrage local sur les données fictives, aucun appel au backend
  const filteredSongs = SONGS.filter((song) => {
    const text = search.toLowerCase();
    const matchesSearch =
      song.title.toLowerCase().includes(text) ||
      song.composer.toLowerCase().includes(text);
    const matchesEnsemble = ensembleFilter === "Tous les ensembles" || song.ensemble === ensembleFilter;
    return matchesSearch && matchesEnsemble;
  });

  return (
    <>
      <Header authenticated />
      <main>
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <div>
              <h1 className={styles.title}>Mes morceaux</h1>
              <p className={styles.subtitle}>{SONGS.length} fiches · tous ensembles confondus</p>
            </div>
            <div className={styles.newButton}>
              {/* TODO: ouvrir le formulaire de création de fiche morceau */}
              <Button variant="primary">+ Nouvelle fiche morceau</Button>
            </div>
          </div>

          {/* Barre de recherche + filtre par ensemble */}
          <div className={styles.toolbar}>
            <div className={styles.searchField}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un titre, un compositeur…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filter}>
              <button
                type="button"
                className={styles.filterButton}
                aria-expanded={filterOpen}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <span className={styles.filterLabel}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  {ensembleFilter}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {filterOpen && (
                <div className={styles.filterMenu}>
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={option === ensembleFilter ? styles.activeFilterOption : styles.filterOption}
                      onClick={() => {
                        setEnsembleFilter(option);
                        setFilterOpen(false);
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
          {filteredSongs.length > 0 ? (
            <div className={styles.grid}>
              {filteredSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>Aucun morceau ne correspond à votre recherche.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
