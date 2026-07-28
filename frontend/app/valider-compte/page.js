"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Bouton from "@/components/Bouton";
import { validerCompte } from "@/lib/api";
import styles from "./page.module.css";

// Contenu de la page, séparé pour pouvoir utiliser useSearchParams dans un Suspense
function ContenuValidation() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Si le token est absent dès le départ, inutile de passer par un effet
  const [statut, setStatut] = useState(token ? "chargement" : "erreur"); // "chargement" | "succes" | "erreur"
  const [message, setMessage] = useState(token ? "" : "Ce lien de validation est incomplet : aucun token n'a été trouvé.");
  const dejaAppele = useRef(false); // évite un double appel (ex: React Strict Mode)

  useEffect(() => {
    if (!token || dejaAppele.current) return;
    dejaAppele.current = true;

    validerCompte(token)
      .then(() => setStatut("succes"))
      .catch((err) => {
        setStatut("erreur");
        setMessage(err.message);
      });
  }, [token]);

  return (
    <div className={styles.carte}>
      {statut === "chargement" && <p className={styles.texte}>Validation de ton compte en cours…</p>}

      {statut === "succes" && (
        <>
          <h1 className={styles.titre}>Compte validé</h1>
          <p className={styles.texte}>
            Ton compte est validé, tu peux maintenant te connecter.
          </p>
          <Bouton href="/connexion" variante="primaire" taille="grande" pleineLargeur>
            Se connecter
          </Bouton>
        </>
      )}

      {statut === "erreur" && (
        <>
          <h1 className={styles.titre}>Validation impossible</h1>
          <p className={styles.erreurTexte}>{message}</p>
          <Bouton href="/inscription" variante="secondaire" taille="grande" pleineLargeur>
            Retour à l&apos;inscription
          </Bouton>
        </>
      )}
    </div>
  );
}

// Page de validation de compte, ouverte depuis le lien reçu par email
export default function ValiderCompte() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.conteneur}>
          <div className={styles.enTete}>
            <Logo taille={48} />
          </div>
          <Suspense fallback={<div className={styles.carte}><p className={styles.texte}>Chargement…</p></div>}>
            <ContenuValidation />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
