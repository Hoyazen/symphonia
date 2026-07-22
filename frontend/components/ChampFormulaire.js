import styles from "./ChampFormulaire.module.css";

// Champ de formulaire réutilisable : étiquette + input
export default function ChampFormulaire({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  erreur,
  ...autresProps
}) {
  return (
    <div className={styles.champ}>
      <label htmlFor={id} className={styles.etiquette}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.saisie}
        {...autresProps}
      />
      {erreur && <p className={styles.erreur}>{erreur}</p>}
    </div>
  );
}
