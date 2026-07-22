import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import BadgeInstrument from "@/components/BadgeInstrument";
import ChampFormulaire from "@/components/ChampFormulaire";
import CarteMorceau from "@/components/CarteMorceau";
import styles from "./page.module.css";

// L'ensemble affiché
// TODO: remplacer par les vraies données du backend (recherchées via l'id de la route)
const ENSEMBLE = {
  nom: "Chœur du Lac",
  dateCreation: "12 mars 2023",
  nombreMembres: 24,
  pupitres: ["soprano", "alto", "tenor", "basse"],
};

// Morceaux appartenant à cet ensemble
// TODO: remplacer par les vraies données du backend
const MORCEAUX_ENSEMBLE = [
  { id: 1, titre: "Ave Verum Corpus", compositeur: "W. A. Mozart", genre: "Sacré", genreFond: "var(--sop-bg)", genreCouleur: "var(--sop)", nombreDocuments: 7 },
  { id: 2, titre: "Bohemian Rhapsody", compositeur: "Queen · arr. J. Leclerc", genre: "Pop", genreFond: "var(--alt-bg)", genreCouleur: "var(--alt)", nombreDocuments: 9 },
  { id: 5, titre: "O Fortuna", compositeur: "Carl Orff", genre: "Classique", genreFond: "var(--sop-bg)", genreCouleur: "var(--sop)", nombreDocuments: 8 },
];

// Membres actuels de l'ensemble
// TODO: remplacer par les vraies données du backend
const MEMBRES = [
  { id: 1, nom: "Claire Dubois", initiales: "CD", pupitre: "soprano", role: "Administratrice" },
  { id: 2, nom: "Sophie Marchand", initiales: "SM", pupitre: "alto", role: "Membre" },
  { id: 3, nom: "Julien Roy", initiales: "JR", pupitre: "tenor", role: "Membre" },
  { id: 4, nom: "Pierre Girard", initiales: "PG", pupitre: "basse", role: "Membre" },
];

// Invitations envoyées, en attente ou acceptées
// TODO: remplacer par les vraies données du backend
const INVITATIONS = [
  { id: 1, email: "antoine.blanc@email.fr", date: "18 avr. 2025", statut: "en_attente" },
  { id: 2, email: "lucie.fontaine@email.fr", date: "15 avr. 2025", statut: "acceptee" },
  { id: 3, email: "rene.morel@email.fr", date: "12 avr. 2025", statut: "en_attente" },
];

const AVATAR_COULEURS = {
  soprano: { fond: "var(--sop-bg)", couleur: "var(--sop)" },
  alto: { fond: "var(--alt-bg)", couleur: "var(--alt)" },
  tenor: { fond: "var(--ten-bg)", couleur: "var(--ten)" },
  basse: { fond: "var(--bas-bg)", couleur: "var(--bas)" },
};

// Seul un administrateur de l'ensemble voit la section "Gestion des membres"
// TODO: déterminer le rôle réel via le backend (administrateur de l'ensemble ou non)
const estAdmin = true;

// Fiche détaillée d'un ensemble : morceaux + gestion des membres (admin)
export default function FicheEnsemble() {
  const membresRestants = ENSEMBLE.nombreMembres - MEMBRES.length;

  return (
    <>
      <Header connecte />
      <main>
        <div className={styles.contenu}>
          <Link href="/tableau-de-bord" className={styles.retour}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Tableau de bord
          </Link>

          {/* En-tête de l'ensemble */}
          <div className={styles.hero}>
            <div className={styles.heroTexte}>
              <div className={styles.heroKicker}>Ensemble</div>
              <h1 className={styles.heroTitre}>{ENSEMBLE.nom}</h1>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Créé le {ENSEMBLE.dateCreation}
                </span>
                <span className={styles.heroMetaItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {ENSEMBLE.nombreMembres} membres
                </span>
              </div>
              <div className={styles.heroBadges}>
                {ENSEMBLE.pupitres.map((pupitre) => (
                  <BadgeInstrument key={pupitre} pupitre={pupitre} />
                ))}
              </div>
            </div>

            {/* Aperçu des membres, visible seulement sur bureau (place limitée ailleurs) */}
            <div className={styles.avatarsApercu}>
              {MEMBRES.map((membre) => (
                <span
                  key={membre.id}
                  className={styles.avatarApercu}
                  style={{ background: AVATAR_COULEURS[membre.pupitre].fond, color: AVATAR_COULEURS[membre.pupitre].couleur }}
                >
                  {membre.initiales}
                </span>
              ))}
              {membresRestants > 0 && (
                <span className={styles.avatarApercuPlus}>+{membresRestants}</span>
              )}
            </div>
          </div>

          {/* Morceaux de l'ensemble */}
          <div className={styles.sectionMorceaux}>
            <div className={styles.enTeteSection}>
              <div>
                <h2 className={styles.titreSection}>Morceaux de l&apos;ensemble</h2>
                <p className={styles.sousTitreSection}>{MORCEAUX_ENSEMBLE.length} fiches morceau</p>
              </div>
              <div className={styles.boutonNouveau}>
                {/* TODO: ouvrir le formulaire de création de fiche morceau */}
                <Bouton variante="primaire">+ Nouvelle fiche morceau</Bouton>
              </div>
            </div>
            <div className={styles.grilleMorceaux}>
              {MORCEAUX_ENSEMBLE.map((morceau) => (
                <CarteMorceau key={morceau.id} morceau={morceau} />
              ))}
            </div>
          </div>

          {/* Gestion des membres, réservée à un administrateur de l'ensemble */}
          {estAdmin && (
            <div className={styles.carteAdmin}>
              <div className={styles.adminEnTete}>
                <div>
                  <h2 className={styles.titreSection}>Gestion des membres</h2>
                  <p className={styles.sousTitreSection}>Invitez de nouveaux musiciens et gérez les rôles.</p>
                </div>
                <span className={styles.badgeAdmin}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Réservé à l&apos;administrateur
                </span>
              </div>

              <div className={styles.adminCorps}>
                {/* Inviter un membre */}
                <div className={styles.inviter}>
                  <p className={styles.inviterLabel}>Inviter un membre</p>
                  <div className={styles.inviterLigne}>
                    <div className={styles.inviterChamp}>
                      <ChampFormulaire
                        id="emailInvite"
                        label="Adresse e-mail du musicien"
                        type="email"
                        placeholder="musicien@email.fr"
                      />
                    </div>
                    {/* Sélecteur décoratif pour l'instant */}
                    {/* TODO: proposer une vraie liste des utilisateurs existants */}
                    <button type="button" className={styles.inviterChoix}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      Ou choisir un membre existant
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {/* TODO: envoyer réellement l'invitation */}
                    <Bouton variante="primaire">Inviter</Bouton>
                  </div>
                </div>

                <div className={styles.colonnes}>
                  {/* Membres actuels */}
                  <div>
                    <div className={styles.sousEnTete}>
                      <h3 className={styles.sousTitre}>Membres actuels</h3>
                      <span className={styles.compte}>{ENSEMBLE.nombreMembres} membres</span>
                    </div>
                    <div className={styles.liste}>
                      {MEMBRES.map((membre) => (
                        <div key={membre.id} className={styles.ligneMembre}>
                          <span
                            className={styles.avatarMembre}
                            style={{ background: AVATAR_COULEURS[membre.pupitre].fond, color: AVATAR_COULEURS[membre.pupitre].couleur }}
                          >
                            {membre.initiales}
                          </span>
                          <div className={styles.infosMembre}>
                            <div className={styles.nomMembre}>{membre.nom}</div>
                            <div className={styles.pupitreMembre}>
                              {membre.pupitre.charAt(0).toUpperCase() + membre.pupitre.slice(1)}
                            </div>
                          </div>
                          <span className={membre.role === "Administratrice" ? styles.roleAdmin : styles.roleMembre}>
                            {membre.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invitations envoyées */}
                  <div>
                    <div className={styles.sousEnTete}>
                      <h3 className={styles.sousTitre}>Invitations envoyées</h3>
                      <span className={styles.compte}>{INVITATIONS.length} invitations</span>
                    </div>
                    <div className={styles.liste}>
                      {INVITATIONS.map((invitation) => (
                        <div key={invitation.id} className={styles.ligneInvitation}>
                          <div className={styles.infosInvitation}>
                            <div className={styles.emailInvitation}>{invitation.email}</div>
                            <div className={styles.dateInvitation}>envoyée le {invitation.date}</div>
                          </div>
                          {invitation.statut === "acceptee" ? (
                            <span className={styles.statutAcceptee}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              Acceptée
                            </span>
                          ) : (
                            <span className={styles.statutEnAttente}>
                              <span className={styles.pointStatut} />
                              En attente
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
