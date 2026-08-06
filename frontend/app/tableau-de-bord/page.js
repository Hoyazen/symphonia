import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import InstrumentBadge from "@/components/InstrumentBadge";
import styles from "./page.module.css";

// Ensembles de l'utilisateur connecté
// TODO: remplacer par les vraies données du backend
const ENSEMBLES = [
  {
    id: 1,
    lastName: "Chœur du Lac",
    creationDate: "12 mars 2023",
    memberCount: 24,
    instruments: ["soprano", "alto", "tenor", "basse"],
    gradient: ["var(--sop-d)", "var(--alt-d)", "var(--ten-d)", "var(--bass-d)"],
  },
  {
    id: 2,
    lastName: "Vocalises du Dimanche",
    creationDate: "5 sept. 2022",
    memberCount: 16,
    instruments: ["alto", "tenor", "basse"],
    gradient: ["var(--alt-d)", "var(--ten-d)"],
  },
  {
    id: 3,
    lastName: "Petit Ensemble Baroque",
    creationDate: "2 janv. 2024",
    memberCount: 9,
    instruments: ["soprano", "tenor"],
    gradient: ["var(--ten-d)", "var(--sop-d)"],
  },
];

// Derniers documents ajoutés, tous ensembles confondus
// TODO: remplacer par les vraies données du backend
const RECENT_ADDITIONS = [
  {
    id: 1,
    title: "Ave Verum — Soprano",
    context: "Chœur du Lac · il y a 2 h",
    background: "var(--doc-pdf-bg)",
    color: "var(--doc-pdf)",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
  {
    id: 2,
    title: "Piano d'accompagnement",
    context: "Libertango · hier",
    background: "var(--doc-audio-bg)",
    color: "var(--doc-audio)",
    icon: <path d="M12 3v12M8 15a4 4 0 1 1-4 4V5l14-2v12" />,
  },
  {
    id: 3,
    title: "Vidéo — concert 2024",
    context: "O Fortuna · il y a 3 j",
    background: "var(--doc-youtube-bg)",
    color: "var(--doc-youtube)",
    icon: (
      <>
        <path d="M22 8.5a3 3 0 0 0-2-2.7C18.2 5.3 12 5.3 12 5.3s-6.2 0-8 .5A3 3 0 0 0 2 8.5 31 31 0 0 0 2 12a31 31 0 0 0 0 3.5 3 3 0 0 0 2 2.7c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2-2.7 31 31 0 0 0 0-3.5 31 31 0 0 0 0-3.5Z" />
        <path d="m10 15 5-3-5-3z" fill="currentColor" />
      </>
    ),
  },
];

// Tableau de bord : accueil personnalisé + "Mes ensembles"
export default function DashboardPage() {
  return (
    <>
      <Header authenticated />
      <main>
        {/* Accueil personnalisé */}
        <div className={styles.welcomeArea}>
          {/* TODO: remplacer "Claire" par le prénom réel de l'utilisateur connecté */}
          <h1 className={styles.greeting}>Bonjour Claire !</h1>
          <p className={styles.homeSubtitle}>Voici vos ensembles et les derniers ajouts.</p>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.mainGrid}>
            {/* Mes ensembles */}
            <div>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mes ensembles</h2>
                <div className={styles.createButton}>
                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <Button variant="primary">+ Créer un ensemble</Button>
                </div>
              </div>

              {ENSEMBLES.length > 0 ? (
                <div className={styles.ensembleGrid}>
                  {ENSEMBLES.map((ensemble) => (
                    <Link key={ensemble.id} href={`/ensembles/${ensemble.id}`} className={styles.cardEnsemble}>
                      <div
                        className={styles.cardBar}
                        style={{ background: `linear-gradient(90deg, ${ensemble.gradient.join(", ")})` }}
                      />
                      <div className={styles.cardBody}>
                        <h3 className={styles.cardName}>{ensemble.lastName}</h3>
                        <div className={styles.cardMeta}>
                          Créé le {ensemble.creationDate} · {ensemble.memberCount} membres
                        </div>
                        <div className={styles.cardBadges}>
                          {ensemble.instruments.map((instrument) => (
                            <InstrumentBadge key={instrument} instrument={instrument} withDot={false} small />
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <button type="button" className={styles.emptyCard}>
                    <span className={styles.emptyCardIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className={styles.emptyCardTitle}>Nouvel ensemble</span>
                    <span className={styles.emptyCardText}>Réunissez vos musiciens et leurs partitions</span>
                  </button>
                </div>
              ) : (
                // État encourageant si l'utilisateur n'a encore aucun ensemble
                <div className={styles.emptyState}>
                  <span className={styles.emptyStateIcon}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </span>
                  <h3 className={styles.emptyStateTitle}>Vous n&apos;avez pas encore d&apos;ensemble</h3>
                  <p className={styles.emptyStateText}>
                    Créez votre premier ensemble pour réunir vos musiciens et leurs partitions.
                  </p>
                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <Button variant="primary">+ Créer un ensemble</Button>
                </div>
              )}
            </div>

            {/* Ajouts récents */}
            <aside className={styles.aside}>
              <h2 className={styles.asideTitle}>Ajouts récents</h2>
              <div className={styles.asideList}>
                {RECENT_ADDITIONS.map((addition) => (
                  <div key={addition.id} className={styles.asideItem}>
                    <span className={styles.asideIcon} style={{ background: addition.background, color: addition.color }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {addition.icon}
                      </svg>
                    </span>
                    <div>
                      <div className={styles.asideItemTitle}>{addition.title}</div>
                      <div className={styles.asideItemMeta}>{addition.context}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
