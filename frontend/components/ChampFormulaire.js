import styles from "./ChampFormulaire.module.css";

// Champ de formulaire réutilisable : étiquette + input
// "lienEtiquette" permet d'ajouter un lien à droite de l'étiquette (ex: "Mot de passe oublié ?")
export default function ChampFormulaire({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  erreur,
  lienEtiquette,
  ...autresProps
}) {
  return (
    <div className={styles.champ}>
      <div className={styles.ligneEtiquette}>
        <label htmlFor={id} className={styles.etiquette}>
          {label}
        </label>
        {lienEtiquette}
      </div>
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
