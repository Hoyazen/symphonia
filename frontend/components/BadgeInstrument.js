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

// Badge coloré indiquant le pupitre / la voix concernée
export default function BadgeInstrument({ pupitre }) {
  const couleurs = COULEURS[pupitre] ?? COULEURS.tous;
  const libelle = LIBELLES[pupitre] ?? pupitre;

  return (
    <span
      className={styles.badge}
      style={{ background: couleurs.fond, color: couleurs.texte }}
    >
      <span className={styles.point} style={{ background: couleurs.point }} />
      {libelle}
    </span>
  );
}
