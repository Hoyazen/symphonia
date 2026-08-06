import Link from "next/link";
import styles from "./Button.module.css";

// Bouton réutilisable : soit un lien (si "href" est fourni), soit un <button>
export default function Button({
  href,
  variant = "primary",
  size = "normal",
  fullWidth = false,
  type = "button",
  disabled = false,
  onClick,
  children,
}) {
  const classes = [
    styles.buttonStyle,
    styles[variant],
    size === "large" ? styles.large : "",
    fullWidth ? styles.fullWidth : "",
  ].join(" ");

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
