import Link from "next/link";
import styles from "./Bouton.module.css";

// Bouton réutilisable : soit un lien (si "href" est fourni), soit un <button>
export default function Bouton({
  href,
  variante = "primaire",
  pleineLargeur = false,
  type = "button",
  disabled = false,
  onClick,
  children,
}) {
  const classes = `${styles.bouton} ${styles[variante]} ${pleineLargeur ? styles.pleineLargeur : ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
