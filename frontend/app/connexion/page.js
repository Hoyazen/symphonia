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

// Page de connexion
export default function Connexion() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: remplacer par le vrai appel de connexion au backend
    router.push("/tableau-de-bord");
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

              <Bouton type="submit" variante="primaire" taille="grande" pleineLargeur>
                Se connecter
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
