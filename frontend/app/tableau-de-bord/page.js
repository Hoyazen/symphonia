import Header from "@/components/Header";
import Bouton from "@/components/Bouton";
import BadgeInstrument from "@/components/BadgeInstrument";
import styles from "./page.module.css";

// Ensembles de l'utilisateur connecté
// TODO: remplacer par les vraies données du backend
const ENSEMBLES = [
  {
    id: 1,
    nom: "Chœur du Lac",
    dateCreation: "12 mars 2023",
    nombreMembres: 24,
    pupitres: ["soprano", "alto", "tenor", "basse"],
    degrade: ["var(--sop-d)", "var(--alt-d)", "var(--ten-d)", "var(--bas-d)"],
  },
  {
    id: 2,
    nom: "Vocalises du Dimanche",
    dateCreation: "5 sept. 2022",
    nombreMembres: 16,
    pupitres: ["alto", "tenor", "basse"],
    degrade: ["var(--alt-d)", "var(--ten-d)"],
  },
  {
    id: 3,
    nom: "Petit Ensemble Baroque",
    dateCreation: "2 janv. 2024",
    nombreMembres: 9,
    pupitres: ["soprano", "tenor"],
    degrade: ["var(--ten-d)", "var(--sop-d)"],
  },
];

// Derniers documents ajoutés, tous ensembles confondus
// TODO: remplacer par les vraies données du backend
const AJOUTS_RECENTS = [
  {
    id: 1,
    titre: "Ave Verum — Soprano",
    contexte: "Chœur du Lac · il y a 2 h",
    fond: "var(--doc-pdf-bg)",
    couleur: "var(--doc-pdf)",
    icone: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
  {
    id: 2,
    titre: "Piano d'accompagnement",
    contexte: "Libertango · hier",
    fond: "var(--doc-audio-bg)",
    couleur: "var(--doc-audio)",
    icone: <path d="M12 3v12M8 15a4 4 0 1 1-4 4V5l14-2v12" />,
  },
  {
    id: 3,
    titre: "Vidéo — concert 2024",
    contexte: "O Fortuna · il y a 3 j",
    fond: "var(--doc-youtube-bg)",
    couleur: "var(--doc-youtube)",
    icone: (
      <>
        <path d="M22 8.5a3 3 0 0 0-2-2.7C18.2 5.3 12 5.3 12 5.3s-6.2 0-8 .5A3 3 0 0 0 2 8.5 31 31 0 0 0 2 12a31 31 0 0 0 0 3.5 3 3 0 0 0 2 2.7c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2-2.7 31 31 0 0 0 0-3.5 31 31 0 0 0 0-3.5Z" />
        <path d="m10 15 5-3-5-3z" fill="currentColor" />
      </>
    ),
  },
];

// Tableau de bord : accueil personnalisé + "Mes ensembles"
export default function TableauDeBord() {
  return (
    <>
      <Header connecte />
      <main>
        {/* Accueil personnalisé */}
        <div className={styles.zoneAccueil}>
          {/* TODO: remplacer "Claire" par le prénom réel de l'utilisateur connecté */}
          <h1 className={styles.salutation}>Bonjour Claire 👋</h1>
          <p className={styles.sousTitreAccueil}>Voici vos ensembles et les derniers ajouts.</p>
        </div>

        <div className={styles.zoneContenu}>
          <div className={styles.grillePrincipale}>
            {/* Mes ensembles */}
            <div>
              <div className={styles.enTeteSection}>
                <h2 className={styles.titreSection}>Mes ensembles</h2>
                <div className={styles.boutonCreer}>
                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <Bouton variante="primaire">+ Créer un ensemble</Bouton>
                </div>
              </div>

              {ENSEMBLES.length > 0 ? (
                <div className={styles.ensemblesGrille}>
                  {ENSEMBLES.map((ensemble) => (
                    // TODO: naviguer vers la fiche de l'ensemble (page pas encore créée)
                    <div key={ensemble.id} className={styles.carteEnsemble}>
                      <div
                        className={styles.carteBarre}
                        style={{ background: `linear-gradient(90deg, ${ensemble.degrade.join(", ")})` }}
                      />
                      <div className={styles.carteCorps}>
                        <h3 className={styles.carteNom}>{ensemble.nom}</h3>
                        <div className={styles.carteMeta}>
                          Créé le {ensemble.dateCreation} · {ensemble.nombreMembres} membres
                        </div>
                        <div className={styles.carteBadges}>
                          {ensemble.pupitres.map((pupitre) => (
                            <BadgeInstrument key={pupitre} pupitre={pupitre} avecPoint={false} petite />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <button type="button" className={styles.carteVide}>
                    <span className={styles.carteVideIcone}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className={styles.carteVideTitre}>Nouvel ensemble</span>
                    <span className={styles.carteVideTexte}>Réunissez vos musiciens et leurs partitions</span>
                  </button>
                </div>
              ) : (
                // État encourageant si l'utilisateur n'a encore aucun ensemble
                <div className={styles.etatVide}>
                  <span className={styles.etatVideIcone}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </span>
                  <h3 className={styles.etatVideTitre}>Vous n&apos;avez pas encore d&apos;ensemble</h3>
                  <p className={styles.etatVideTexte}>
                    Créez votre premier ensemble pour réunir vos musiciens et leurs partitions.
                  </p>
                  {/* TODO: ouvrir le formulaire de création d'ensemble */}
                  <Bouton variante="primaire">+ Créer un ensemble</Bouton>
                </div>
              )}
            </div>

            {/* Ajouts récents */}
            <aside className={styles.aside}>
              <h2 className={styles.asideTitre}>Ajouts récents</h2>
              <div className={styles.asideListe}>
                {AJOUTS_RECENTS.map((ajout) => (
                  <div key={ajout.id} className={styles.asideItem}>
                    <span className={styles.asideIcone} style={{ background: ajout.fond, color: ajout.couleur }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {ajout.icone}
                      </svg>
                    </span>
                    <div>
                      <div className={styles.asideItemTitre}>{ajout.titre}</div>
                      <div className={styles.asideItemMeta}>{ajout.contexte}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
