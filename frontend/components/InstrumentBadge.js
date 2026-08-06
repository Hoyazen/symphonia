import styles from "./InstrumentBadge.module.css";

// Couleurs par pupitre, reprises de la maquette
const COLORS = {
  soprano: { background: "var(--sop-bg)", text: "var(--sop)", dot: "var(--sop-d)" },
  alto: { background: "var(--alt-bg)", text: "var(--alt)", dot: "var(--alt-d)" },
  tenor: { background: "var(--ten-bg)", text: "var(--ten)", dot: "var(--ten-d)" },
  bass: { background: "var(--bass-bg)", text: "var(--bass)", dot: "var(--bass-d)" },
  all: { background: "var(--yellow-soft)", text: "#8a5f00", dot: "var(--yellow)" },
};

const LABELS = {
  soprano: "Soprano",
  alto: "Alto",
  tenor: "Ténor",
  bass: "Basse",
  all: "Tous",
};

// Badge coloré indiquant le pupitre / la voix concernée.
// "avecPoint" affiche la petite pastille de couleur (utile dans les listes de pupitres).
// "petite" réduit la taille (utile dans les cartes d'ensemble, plus denses).
export default function InstrumentBadge({ instrument, withDot = true, small = false }) {
  const colors = COLORS[instrument] ?? COLORS.all;
  const label = LABELS[instrument] ?? instrument;
  const classes = `${styles.badge} ${small ? styles.small : ""}`;

  return (
    <span className={classes} style={{ background: colors.background, color: colors.text }}>
      {withDot && <span className={styles.dot} style={{ background: colors.dot }} />}
      {label}
    </span>
  );
}
