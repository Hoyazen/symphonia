import styles from "./Card.module.css";

// Conteneur en carte, utilisé pour les fiches morceau, formulaires, etc.
export default function Card({ children, className = "" }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
