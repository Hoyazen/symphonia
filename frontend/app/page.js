import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import styles from "./page.module.css";

// Page d'accueil (visiteur non connecté)
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Section héro */}
        <section className={styles.hero}>
          <div>
            <span className={styles.badge}>Pour chorales, groupes & orchestres</span>

            <h1 className={styles.title}>
              Centralisez et partagez les partitions de votre ensemble
            </h1>

            <p className={styles.subtitle}>
              Fini les partitions éparpillées dans les boîtes mail. Réunissez vos morceaux,
              vos enregistrements et vos vidéos au même endroit — accessibles à tous les
              musiciens, sur ordinateur comme sur mobile.
            </p>

            <div className={styles.heroButtons}>
              <Button href="/inscription" variant="primary" size="large">
                S&apos;inscrire gratuitement
              </Button>
              <Button href="/connexion" variant="secondary" size="large">
                Se connecter
              </Button>
            </div>
          </div>

          {/* Illustration : aperçu d'une fiche morceau (cachée sur mobile) */}
          <div className={styles.heroIllustration}>
            <div className={styles.previewCard}>
              <div className={styles.previewCardKicker}>Fiche morceau</div>
              <div className={styles.previewCardTitle}>Ave Verum Corpus</div>
              <p className={styles.previewCardSubtitle}>W. A. Mozart · Sacré</p>

              <div className={styles.pills}>
                <span className={styles.pill} style={{ background: "var(--sop-d)" }} />
                <span className={styles.pill} style={{ background: "var(--alt-d)" }} />
                <span className={styles.pill} style={{ background: "var(--ten-d)" }} />
                <span className={styles.pill} style={{ background: "var(--bass-d)" }} />
              </div>

              <div className={styles.player}>
                <span className={styles.playerButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className={styles.playerBar}>
                  <div className={styles.playerBarFill} />
                </div>
                <span className={styles.playerTime}>1:12</span>
              </div>
            </div>

            <div className={styles.fileCard}>
              <span className={styles.fileCardIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </span>
              <div>
                <div className={styles.fileCardName}>Soprano.pdf</div>
                <div className={styles.fileCardAuthor}>ajouté par Claire</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section des trois bénéfices */}
        <section className={styles.benefits}>
          <h2 className={styles.benefitsTitle}>Trois gestes, tout est partagé</h2>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 11v6M9 14h6" />
                </svg>
              </span>
              <h3>Créez une fiche morceau</h3>
              <p>Titre, compositeur, genre, descriptif : chaque œuvre a sa fiche claire et complète.</p>
            </div>

            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12M8 15a4 4 0 1 1-4 4V5l14-2v12" />
                  <path d="M18 17a4 4 0 1 1-4 4" />
                </svg>
              </span>
              <h3>Déposez partitions & audio</h3>
              <p>PDF, images, fichiers mp3/ogg, liens YouTube — étiquetés par voix ou instrument.</p>
            </div>

            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4zM19 12a7 7 0 0 0-2-4.9M15.5 8.5a3 3 0 0 1 0 5" />
                </svg>
              </span>
              <h3>Écoutez en ligne</h3>
              <p>Lecteur audio et vidéo intégrés : chacun travaille sa partie depuis n&apos;importe où.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
