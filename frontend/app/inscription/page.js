"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { register } from "@/lib/api";
import styles from "./page.module.css";

// Page d'inscription
export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Règles de mot de passe, vérifiées en direct pendant la saisie
  const hasMinimumLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = passwordConfirmation.length > 0 && password === passwordConfirmation;

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await register({ firstName, lastName, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <Logo size={48} />
            <h1 className={styles.title}>Créer votre compte</h1>
            <p className={styles.subtitle}>Rejoignez votre ensemble en quelques secondes.</p>
          </div>

          <div className={styles.card}>
            {success ? (
              <div className={styles.successBox}>
                <p className={styles.successTitle}>Compte créé !</p>
                <p className={styles.successText}>
                  Un e-mail de validation a été envoyé à {email}. Clique sur le lien qu&apos;il contient pour activer ton compte, puis connecte-toi.
                </p>
                <Button href="/connexion" variant="primary" size="large" fullWidth>
                  Aller à la connexion
                </Button>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className={styles.globalError}>{error}</p>}
              {/* Photo de profil (juste visuel pour l'instant, pas d'upload réel) */}
              <div className={styles.profilePhotoRow}>
                <span className={styles.profilePhotoAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4z" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </span>
                <div>
                  <div className={styles.profilePhotoText}>
                    Photo de profil <span className={styles.optionalProfilePhoto}>(optionnelle)</span>
                  </div>
                  <button type="button" className={styles.profilePhotoButton}>
                    Choisir une image
                  </button>
                </div>
              </div>

              <div className={styles.twoColumnGrid}>
                <FormField
                  id="firstName"
                  label="Prénom *"
                  placeholder="Claire"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <FormField
                  id="lastName"
                  label="Nom *"
                  placeholder="Dubois"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <FormField
                id="email"
                label="Adresse e-mail *"
                type="email"
                placeholder="claire.dubois@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className={styles.twoColumnGrid}>
                <FormField
                  id="password"
                  label="Mot de passe *"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className={styles.confirmationField}>
                  <FormField
                    id="confirmation"
                    label="Confirmation *"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    style={passwordsMatch ? { borderColor: "var(--ten-d)" } : undefined}
                    required
                  />
                </div>
              </div>

              {/* Règles du mot de passe, cochées automatiquement */}
              <div className={styles.rulesBox}>
                <div className={styles.rulesTitle}>Votre mot de passe doit contenir :</div>
                <div className={styles.rulesList}>
                  <PasswordRule met={hasMinimumLength}>au moins 8 caractères</PasswordRule>
                  <PasswordRule met={hasUppercase}>une majuscule</PasswordRule>
                  <PasswordRule met={hasSpecialCharacter}>un caractère spécial (!, @, #…)</PasswordRule>
                </div>
              </div>

              {/* Case CGU, obligatoire pour créer le compte */}
              <label className={styles.termsRow}>
                <input
                  type="checkbox"
                  className={styles.termsInput}
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <span className={styles.termsCheckmark}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className={styles.termsText}>
                  J&apos;accepte les <a href="#" className={styles.termsLink}>conditions générales d&apos;utilisation</a> de Symphonia.
                </span>
              </label>

              <Button type="submit" variant="primary" size="large" fullWidth disabled={loading}>
                {loading ? "Création en cours…" : "Créer mon compte"}
              </Button>
              <p className={styles.emailNote}>Un e-mail de validation vous sera envoyé.</p>
            </form>
            )}
          </div>

          <p className={styles.alreadyRegistered}>
            Déjà inscrit ? <Link href="/connexion" className={styles.alreadyRegisteredLink}>Se connecter</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Une ligne de la liste des règles de mot de passe (coche verte ou cercle vide)
function PasswordRule({ met, children }) {
  return (
    <div className={met ? styles.validRule : styles.pendingRule}>
      <span className={styles.ruleCircle}>
        {met && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {children}
    </div>
  );
}
