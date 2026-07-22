import styles from "./Carte.module.css";

// Conteneur en carte, utilisé pour les fiches morceau, formulaires, etc.
export default function Carte({ children, className = "" }) {
  return <div className={`${styles.carte} ${className}`}>{children}</div>;
}
