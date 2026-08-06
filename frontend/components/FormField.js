import styles from "./FormField.module.css";

// Champ de formulaire réutilisable : étiquette + input
// "lienEtiquette" permet d'ajouter un lien à droite de l'étiquette (ex: "Mot de passe oublié ?")
export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  labelLink,
  ...otherProps
}) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.labelText}>
          {label}
        </label>
        {labelLink}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        {...otherProps}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
