import Link from "next/link";
import styles from "./SongCard.module.css";

// Carte cliquable d'un morceau, utilisée sur "Mes morceaux" et sur la fiche d'un ensemble.
// "morceau.ensemble" est optionnel : si absent, on ne l'affiche pas (ex: on est déjà sur cet ensemble).
export default function SongCard({ song }) {
  return (
    <Link href={`/morceaux/${song.id}`} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </span>
        <span className={styles.cardGenre} style={{ background: song.genreBackground, color: song.genreColor }}>
          {song.genre}
        </span>
      </div>
      <h3 className={styles.cardTitle}>{song.title}</h3>
      <p className={styles.cardComposer}>{song.composer}</p>
      <div className={song.ensemble ? styles.cardBottom : styles.cardBottomAlone}>
        {song.ensemble && <span className={styles.cardEnsemble}>{song.ensemble}</span>}
        <span className={styles.cardDocuments}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
          {song.documentCount} documents
        </span>
      </div>
    </Link>
  );
}
