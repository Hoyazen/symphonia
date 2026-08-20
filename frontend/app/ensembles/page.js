import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import InstrumentBadge from "@/components/InstrumentBadge";
import FormField from "@/components/FormField";
import SongCard from "@/components/SongCard";
import styles from "./page.module.css";

// L'ensemble affiché
// TODO: remplacer par les vraies données du backend (recherchées via l'id de la route)
const ENSEMBLE = {
  lastName: "Chœur du Lac",
  creationDate: "12 mars 2023",
  memberCount: 24,
  instruments: ["soprano", "alto", "tenor", "basse"],
};

// Morceaux appartenant à cet ensemble
// TODO: remplacer par les vraies données du backend
const ENSEMBLE_SONGS = [
  { id: 1, title: "Ave Verum Corpus", composer: "W. A. Mozart", genre: "Sacré", genreBackground: "var(--sop-bg)", genreColor: "var(--sop)", documentCount: 7 },
  { id: 2, title: "Bohemian Rhapsody", composer: "Queen · arr. J. Leclerc", genre: "Pop", genreBackground: "var(--alt-bg)", genreColor: "var(--alt)", documentCount: 9 },
  { id: 5, title: "O Fortuna", composer: "Carl Orff", genre: "Classique", genreBackground: "var(--sop-bg)", genreColor: "var(--sop)", documentCount: 8 },
];

// Membres actuels de l'ensemble
// TODO: remplacer par les vraies données du backend
const MEMBERS = [
  { id: 1, lastName: "Claire Dubois", initials: "CD", instrument: "soprano", role: "Administratrice" },
  { id: 2, lastName: "Sophie Marchand", initials: "SM", instrument: "alto", role: "Membre" },
  { id: 3, lastName: "Julien Roy", initials: "JR", instrument: "tenor", role: "Membre" },
  { id: 4, lastName: "Pierre Girard", initials: "PG", instrument: "bass", role: "Membre" },
];

// Invitations envoyées, en attente ou acceptées
// TODO: remplacer par les vraies données du backend
const INVITATIONS = [
  { id: 1, email: "antoine.blanc@email.fr", date: "18 avr. 2025", status: "pending" },
  { id: 2, email: "lucie.fontaine@email.fr", date: "15 avr. 2025", status: "accepted" },
  { id: 3, email: "rene.morel@email.fr", date: "12 avr. 2025", status: "pending" },
];

const AVATAR_COLORS = {
  soprano: { background: "var(--sop-bg)", color: "var(--sop)" },
  alto: { background: "var(--alt-bg)", color: "var(--alt)" },
  tenor: { background: "var(--ten-bg)", color: "var(--ten)" },
  bass: { background: "var(--bass-bg)", color: "var(--bass)" },
};

// Seul un administrateur de l'ensemble voit la section "Gestion des membres"
// TODO: déterminer le rôle réel via le backend (administrateur de l'ensemble ou non)
const isAdmin = true;

// Fiche détaillée d'un ensemble : morceaux + gestion des membres (admin)
export default function EnsembleDetailsPage() {
  const remainingMembers = ENSEMBLE.memberCount - MEMBERS.length;

  return (
    <>
      <Header authenticated />
      <main>
        <div className={styles.content}>
          <Link href="/tableau-de-bord" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Tableau de bord
          </Link>

          {/* En-tête de l'ensemble */}
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <div className={styles.heroKicker}>Ensemble</div>
              <h1 className={styles.heroTitle}>{ENSEMBLE.lastName}</h1>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Créé le {ENSEMBLE.creationDate}
                </span>
                <span className={styles.heroMetaItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {ENSEMBLE.memberCount} membres
                </span>
              </div>
              <div className={styles.heroBadges}>
                {ENSEMBLE.instruments.map((instrument) => (
                  <InstrumentBadge key={instrument} instrument={instrument} />
                ))}
              </div>
            </div>

            {/* Aperçu des membres, visible seulement sur bureau (place limitée ailleurs) */}
            <div className={styles.avatarPreviews}>
              {MEMBERS.map((member) => (
                <span
                  key={member.id}
                  className={styles.avatarPreview}
                  style={{ background: AVATAR_COLORS[member.instrument].background, color: AVATAR_COLORS[member.instrument].color }}
                >
                  {member.initials}
                </span>
              ))}
              {remainingMembers > 0 && (
                <span className={styles.avatarPreviewMore}>+{remainingMembers}</span>
              )}
            </div>
          </div>

          {/* Morceaux de l'ensemble */}
          <div className={styles.songsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Morceaux de l&apos;ensemble</h2>
                <p className={styles.sectionSubtitle}>{ENSEMBLE_SONGS.length} fiches morceau</p>
              </div>
              <div className={styles.newButton}>
                {/* TODO: ouvrir le formulaire de création de fiche morceau */}
                <Button variant="primary">+ Nouvelle fiche morceau</Button>
              </div>
            </div>
            <div className={styles.songsGrid}>
              {ENSEMBLE_SONGS.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>

          {/* Gestion des membres, réservée à un administrateur de l'ensemble */}
          {isAdmin && (
            <div className={styles.adminCard}>
              <div className={styles.adminHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>Gestion des membres</h2>
                  <p className={styles.sectionSubtitle}>Invitez de nouveaux musiciens et gérez les rôles.</p>
                </div>
                <span className={styles.adminBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Réservé à l&apos;administrateur
                </span>
              </div>

              <div className={styles.adminBody}>
                {/* Inviter un membre */}
                <div className={styles.inviteSection}>
                  <p className={styles.inviteLabel}>Inviter un membre</p>
                  <div className={styles.inviteRow}>
                    <div className={styles.inviteField}>
                      <FormField
                        id="emailInvite"
                        label="Adresse e-mail du musicien"
                        type="email"
                        placeholder="musicien@email.fr"
                      />
                    </div>
                    {/* Sélecteur décoratif pour l'instant */}
                    {/* TODO: proposer une vraie liste des utilisateurs existants */}
                    <button type="button" className={styles.existingMemberChoice}>
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
                    <Button variant="primary">Inviter</Button>
                  </div>
                </div>

                <div className={styles.columns}>
                  {/* Membres actuels */}
                  <div>
                    <div className={styles.subsectionHeader}>
                      <h3 className={styles.subtitle}>Membres actuels</h3>
                      <span className={styles.count}>{ENSEMBLE.memberCount} membres</span>
                    </div>
                    <div className={styles.list}>
                      {MEMBERS.map((member) => (
                        <div key={member.id} className={styles.memberRow}>
                          <span
                            className={styles.memberAvatar}
                            style={{ background: AVATAR_COLORS[member.instrument].background, color: AVATAR_COLORS[member.instrument].color }}
                          >
                            {member.initials}
                          </span>
                          <div className={styles.memberInfo}>
                            <div className={styles.memberName}>{member.lastName}</div>
                            <div className={styles.memberInstrument}>
                              {member.instrument.charAt(0).toUpperCase() + member.instrument.slice(1)}
                            </div>
                          </div>
                          <span className={member.role === "Administratrice" ? styles.adminRole : styles.memberRole}>
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invitations envoyées */}
                  <div>
                    <div className={styles.subsectionHeader}>
                      <h3 className={styles.subtitle}>Invitations envoyées</h3>
                      <span className={styles.count}>{INVITATIONS.length} invitations</span>
                    </div>
                    <div className={styles.list}>
                      {INVITATIONS.map((invitation) => (
                        <div key={invitation.id} className={styles.invitationRow}>
                          <div className={styles.invitationInfo}>
                            <div className={styles.invitationEmail}>{invitation.email}</div>
                            <div className={styles.invitationDate}>envoyée le {invitation.date}</div>
                          </div>
                          {invitation.status === "accepted" ? (
                            <span className={styles.acceptedStatus}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              Acceptée
                            </span>
                          ) : (
                            <span className={styles.pendingStatus}>
                              <span className={styles.statusDot} />
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
