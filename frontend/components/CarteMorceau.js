import Link from "next/link";
import styles from "./CarteMorceau.module.css";

// Carte cliquable d'un morceau, utilisée sur "Mes morceaux" et sur la fiche d'un ensemble.
// "morceau.ensemble" est optionnel : si absent, on ne l'affiche pas (ex: on est déjà sur cet ensemble).
export default function CarteMorceau({ morceau }) {
  return (
    <Link href={`/morceaux/${morceau.id}`} className={styles.carte}>
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
      <div className={morceau.ensemble ? styles.carteBas : styles.carteBasSeul}>
        {morceau.ensemble && <span className={styles.carteEnsemble}>{morceau.ensemble}</span>}
        <span className={styles.carteDocuments}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
          {morceau.nombreDocuments} documents
        </span>
      </div>
    </Link>
  );
}
