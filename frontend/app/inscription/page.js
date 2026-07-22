"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import ChampFormulaire from "@/components/ChampFormulaire";
import Bouton from "@/components/Bouton";
import styles from "./page.module.css";

// Page d'inscription
export default function Inscription() {
  const router = useRouter();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [cguAcceptee, setCguAcceptee] = useState(false);

  // Règles de mot de passe, vérifiées en direct pendant la saisie
  const auMoins8Caracteres = motDePasse.length >= 8;
  const uneMajuscule = /[A-Z]/.test(motDePasse);
  const unCaractereSpecial = /[^A-Za-z0-9]/.test(motDePasse);
  const motsDePasseIdentiques = confirmation.length > 0 && motDePasse === confirmation;

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: remplacer par le vrai appel d'inscription au backend
    router.push("/tableau-de-bord");
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.conteneur}>
          <div className={styles.enTete}>
            <Logo taille={48} />
            <h1 className={styles.titre}>Créer votre compte</h1>
            <p className={styles.sousTitre}>Rejoignez votre ensemble en quelques secondes.</p>
          </div>

          <div className={styles.carte}>
            <form onSubmit={handleSubmit}>
              {/* Photo de profil (juste visuel pour l'instant, pas d'upload réel) */}
              <div className={styles.photoLigne}>
                <span className={styles.photoAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4z" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </span>
                <div>
                  <div className={styles.photoTexte}>
                    Photo de profil <span className={styles.photoOptionnel}>(optionnelle)</span>
                  </div>
                  <button type="button" className={styles.photoBouton}>
                    Choisir une image
                  </button>
                </div>
              </div>

              <div className={styles.grille2}>
                <ChampFormulaire
                  id="prenom"
                  label="Prénom *"
                  placeholder="Claire"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
                <ChampFormulaire
                  id="nom"
                  label="Nom *"
                  placeholder="Dubois"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>

              <ChampFormulaire
                id="email"
                label="Adresse e-mail *"
                type="email"
                placeholder="claire.dubois@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className={styles.grille2}>
                <ChampFormulaire
                  id="motDePasse"
                  label="Mot de passe *"
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                />
                <div className={styles.confirmationChamp}>
                  <ChampFormulaire
                    id="confirmation"
                    label="Confirmation *"
                    type="password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    style={motsDePasseIdentiques ? { borderColor: "var(--ten-d)" } : undefined}
                    required
                  />
                </div>
              </div>

              {/* Règles du mot de passe, cochées automatiquement */}
              <div className={styles.reglesBoite}>
                <div className={styles.reglesTitre}>Votre mot de passe doit contenir :</div>
                <div className={styles.reglesListe}>
                  <RegleMotDePasse respectee={auMoins8Caracteres}>au moins 8 caractères</RegleMotDePasse>
                  <RegleMotDePasse respectee={uneMajuscule}>une majuscule</RegleMotDePasse>
                  <RegleMotDePasse respectee={unCaractereSpecial}>un caractère spécial (!, @, #…)</RegleMotDePasse>
                </div>
              </div>

              {/* Case CGU, obligatoire pour créer le compte */}
              <label className={styles.cguLigne}>
                <input
                  type="checkbox"
                  className={styles.cguInput}
                  checked={cguAcceptee}
                  onChange={(e) => setCguAcceptee(e.target.checked)}
                  required
                />
                <span className={styles.cguCoche}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className={styles.cguTexte}>
                  J&apos;accepte les <a href="#" className={styles.cguLien}>conditions générales d&apos;utilisation</a> de Symphonia.
                </span>
              </label>

              <Bouton type="submit" variante="primaire" taille="grande" pleineLargeur>
                Créer mon compte
              </Bouton>
              <p className={styles.mentionEmail}>Un e-mail de validation vous sera envoyé.</p>
            </form>
          </div>

          <p className={styles.dejaInscrit}>
            Déjà inscrit ? <Link href="/connexion" className={styles.dejaInscritLien}>Se connecter</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Une ligne de la liste des règles de mot de passe (coche verte ou cercle vide)
function RegleMotDePasse({ respectee, children }) {
  return (
    <div className={respectee ? styles.regleValide : styles.regleAttente}>
      <span className={styles.regleRond}>
        {respectee && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {children}
    </div>
  );
}
