"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { validateAccount } from "@/lib/api";
import styles from "./page.module.css";

// Contenu de la page, séparé pour pouvoir utiliser useSearchParams dans un Suspense
function ValidationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Si le token est absent dès le départ, inutile de passer par un effet
  const [status, setStatus] = useState(token ? "loading" : "error"); // "chargement" | "succes" | "erreur"
  const [message, setMessage] = useState(token ? "" : "Ce lien de validation est incomplet : aucun token n'a été trouvé.");
  const alreadyCalled = useRef(false); // évite un double appel (ex: React Strict Mode)

  useEffect(() => {
    if (!token || alreadyCalled.current) return;
    alreadyCalled.current = true;

    validateAccount(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [token]);

  return (
    <div className={styles.card}>
      {status === "loading" && <p className={styles.text}>Validation de ton compte en cours…</p>}

      {status === "success" && (
        <>
          <h1 className={styles.title}>Compte validé</h1>
          <p className={styles.text}>
            Ton compte est validé, tu peux maintenant te connecter.
          </p>
          <Button href="/connexion" variant="primary" size="large" fullWidth>
            Se connecter
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className={styles.title}>Validation impossible</h1>
          <p className={styles.errorText}>{message}</p>
          <Button href="/inscription" variant="secondary" size="large" fullWidth>
            Retour à l&apos;inscription
          </Button>
        </>
      )}
    </div>
  );
}

// Page de validation de compte, ouverte depuis le lien reçu par email
export default function ValidateAccountPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <Logo size={48} />
          </div>
          <Suspense fallback={<div className={styles.card}><p className={styles.text}>Chargement…</p></div>}>
            <ValidationContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
