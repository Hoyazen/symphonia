import styles from "./BadgeInstrument.module.css";

// Couleurs par pupitre, reprises de la maquette
const COULEURS = {
  soprano: { fond: "var(--sop-bg)", texte: "var(--sop)", point: "var(--sop-d)" },
  alto: { fond: "var(--alt-bg)", texte: "var(--alt)", point: "var(--alt-d)" },
  tenor: { fond: "var(--ten-bg)", texte: "var(--ten)", point: "var(--ten-d)" },
  basse: { fond: "var(--bas-bg)", texte: "var(--bas)", point: "var(--bas-d)" },
  tous: { fond: "var(--yellow-soft)", texte: "#8a5f00", point: "var(--yellow)" },
};

const LIBELLES = {
  soprano: "Soprano",
  alto: "Alto",
  tenor: "Ténor",
  basse: "Basse",
  tous: "Tous",
};

// Badge coloré indiquant le pupitre / la voix concernée.
// "avecPoint" affiche la petite pastille de couleur (utile dans les listes de pupitres).
// "petite" réduit la taille (utile dans les cartes d'ensemble, plus denses).
export default function BadgeInstrument({ pupitre, avecPoint = true, petite = false }) {
  const couleurs = COULEURS[pupitre] ?? COULEURS.tous;
  const libelle = LIBELLES[pupitre] ?? pupitre;
  const classes = `${styles.badge} ${petite ? styles.petite : ""}`;

  return (
    <span className={classes} style={{ background: couleurs.fond, color: couleurs.texte }}>
      {avecPoint && <span className={styles.point} style={{ background: couleurs.point }} />}
      {libelle}
    </span>
  );
}
