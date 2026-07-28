"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import ChampFormulaire from "@/components/ChampFormulaire";
import Bouton from "@/components/Bouton";
import { connecter } from "@/lib/api";
import styles from "./page.module.css";

// Page de connexion
export default function Connexion() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setErreur(null);
    setChargement(true);
    try {
      const reponse = await connecter({ email, motDePasse });
      localStorage.setItem("symphonia_token", reponse.token);
      localStorage.setItem(
        "symphonia_utilisateur",
        JSON.stringify({ email: reponse.email, prenom: reponse.prenom, nom: reponse.nom, role: reponse.role })
      );
      router.push("/tableau-de-bord");
    } catch (err) {
      setErreur(err.message);
      setChargement(false);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.conteneur}>
          <div className={styles.enTete}>
            <Logo taille={48} />
            <h1 className={styles.titre}>Content de vous revoir</h1>
            <p className={styles.sousTitre}>Connectez-vous pour retrouver vos morceaux.</p>
          </div>

          <div className={styles.carte}>
            <form onSubmit={handleSubmit}>
              {erreur && <p className={styles.erreurGlobale}>{erreur}</p>}
              <ChampFormulaire
                id="email"
                label="Adresse e-mail"
                type="email"
                placeholder="claire.dubois@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <ChampFormulaire
                id="motDePasse"
                label="Mot de passe"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                lienEtiquette={
                  <a href="#" className={styles.lienOublie}>
                    Mot de passe oublié ?
                  </a>
                }
                required
              />

              <Bouton type="submit" variante="primaire" taille="grande" pleineLargeur disabled={chargement}>
                {chargement ? "Connexion en cours…" : "Se connecter"}
              </Bouton>
            </form>
          </div>

          <p className={styles.pasDeCompte}>
            Pas encore de compte ?{" "}
            <Link href="/inscription" className={styles.lienInscription}>
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
