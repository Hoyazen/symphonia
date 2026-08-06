"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { login } from "@/lib/api";
import styles from "./page.module.css";

// Page de connexion
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setLoading(true);
    try {
      const response = await login({ email, password });
      localStorage.setItem("symphonia_token", response.token);
      localStorage.setItem(
        "symphonia_user",
        JSON.stringify({ email: response.email, firstName: response.firstName, lastName: response.lastName, role: response.role })
      );
      router.push("/tableau-de-bord");
    } catch (err) {
      setError(err.message);
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
            <h1 className={styles.title}>Content de vous revoir</h1>
            <p className={styles.subtitle}>Connectez-vous pour retrouver vos morceaux.</p>
          </div>

          <div className={styles.card}>
            <form onSubmit={handleSubmit}>
              {error && <p className={styles.globalError}>{error}</p>}
              <FormField
                id="email"
                label="Adresse e-mail"
                type="email"
                placeholder="claire.dubois@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <FormField
                id="password"
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelLink={
                  <a href="#" className={styles.forgotPasswordLink}>
                    Mot de passe oublié ?
                  </a>
                }
                required
              />

              <Button type="submit" variant="primary" size="large" fullWidth disabled={loading}>
                {loading ? "Connexion en cours…" : "Se connecter"}
              </Button>
            </form>
          </div>

          <p className={styles.noAccount}>
            Pas encore de compte ?{" "}
            <Link href="/inscription" className={styles.registrationLink}>
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
