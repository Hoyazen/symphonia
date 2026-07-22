"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import BadgeInstrument from "@/components/BadgeInstrument";
import styles from "./page.module.css";

// Le morceau affiché et ses documents
// TODO: remplacer par les vraies données du backend (recherchées via l'id de la route)
const MORCEAU = {
  titre: "Ave Verum Corpus",
  genre: "Sacré · Motet",
  genreFond: "var(--sop-bg)",
  genreCouleur: "var(--sop)",
  ensemble: "Chœur du Lac",
  compositeur: "Wolfgang Amadeus Mozart · K. 618",
  description:
    "Motet en ré majeur pour chœur à quatre voix et orgue, composé en 1791. Pièce douce et recueillie, idéale pour travailler l'homogénéité des pupitres et les nuances piano.",
};

// Documents groupés par pupitre. Types possibles :
// "pdf", "image", "audio-simple" (liste), "audio-lecteur" (lecteur complet), "youtube" (lecteur vidéo)
const GROUPES_DOCUMENTS = [
  {
    pupitre: "tous",
    documents: [
      { id: 1, type: "pdf", nom: "Partition complète.pdf", meta: "PDF · ajouté le 10 avr. 2025 par Claire Dubois", pupitre: "tous" },
      { id: 2, type: "audio-lecteur", nom: "Piano d'accompagnement.mp3", duree: "1:12 / 3:04" },
      { id: 3, type: "youtube", nom: "Ave Verum — King's College Choir", meta: "ajouté le 8 avr. 2025 par Marc Petit" },
    ],
  },
  {
    pupitre: "soprano",
    documents: [
      { id: 4, type: "pdf", nom: "AveVerum_Soprano.pdf", meta: "PDF · ajouté le 14 avr. 2025 par Claire Dubois", pupitre: "soprano" },
      { id: 5, type: "audio-simple", nom: "Soprano_guide.mp3", meta: "Audio · 2:48 · ajouté le 14 avr. 2025 par Claire Dubois", pupitre: "soprano" },
    ],
  },
  {
    pupitre: "alto",
    documents: [
      { id: 6, type: "pdf", nom: "AveVerum_Alto.pdf", meta: "PDF · ajouté le 14 avr. 2025 par Sophie Marchand", pupitre: "alto" },
    ],
  },
  {
    pupitre: "tenor",
    documents: [
      { id: 7, type: "pdf", nom: "AveVerum_Tenor.pdf", meta: "PDF · ajouté le 13 avr. 2025 par Julien Roy", pupitre: "tenor" },
    ],
  },
  {
    pupitre: "basse",
    documents: [
      { id: 8, type: "pdf", nom: "AveVerum_Basse.pdf", meta: "PDF · ajouté le 13 avr. 2025 par Julien Roy", pupitre: "basse" },
      { id: 9, type: "image", nom: "Scan_annotations_basse.jpg", meta: "Image · ajouté le 12 avr. 2025 par Pierre Girard", pupitre: "basse" },
    ],
  },
];

const LIBELLE_GROUPE = { tous: "Tous les pupitres", soprano: "Soprano", alto: "Alto", tenor: "Ténor", basse: "Basse" };
const COULEUR_POINT_GROUPE = { tous: "var(--yellow)", soprano: "var(--sop-d)", alto: "var(--alt-d)", tenor: "var(--ten-d)", basse: "var(--bas-d)" };
const COULEUR_TITRE_GROUPE = { soprano: "var(--sop)", alto: "var(--alt)", tenor: "var(--ten)", basse: "var(--bas)" };

const COULEURS_TYPE = {
  pdf: { fond: "var(--doc-pdf-bg)", couleur: "var(--doc-pdf)" },
  image: { fond: "var(--doc-image-bg)", couleur: "var(--doc-image)" },
  "audio-simple": { fond: "var(--doc-audio-bg)", couleur: "var(--doc-audio)" },
};

// Icône de suppression, réutilisée sur chaque document
function IconeSupprimer() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  );
}

// Ligne d'un document simple : PDF, image, ou audio sans lecteur complet
function DocumentSimple({ doc }) {
  const { fond, couleur } = COULEURS_TYPE[doc.type];

  return (
    <div className={styles.document}>
      <span className={styles.documentIcone} style={{ background: fond, color: couleur }}>
        {doc.type === "pdf" && (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        )}
        {doc.type === "image" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        )}
        {doc.type === "audio-simple" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </span>
      <div className={styles.documentTexte}>
        <div className={styles.documentNom}>{doc.nom}</div>
        <div className={styles.documentMeta}>{doc.meta}</div>
      </div>
      {doc.pupitre && <BadgeInstrument pupitre={doc.pupitre} avecPoint={false} petite />}
      {/* TODO: supprimer réellement le document (backend) */}
      <button type="button" className={styles.documentSupprimer} aria-label="Supprimer">
        <IconeSupprimer />
      </button>
    </div>
  );
}

// Fiche morceau : détail d'un morceau avec ses documents et lecteurs
export default function FicheMorceau() {
  const [audioEnCours, setAudioEnCours] = useState(false);
  const [videoOuverte, setVideoOuverte] = useState(false);
  const audioRef = useRef(null);

  function basculerLecture() {
    if (!audioRef.current) return;
    if (audioEnCours) audioRef.current.pause();
    else audioRef.current.play();
  }

  // Choisit le bon rendu selon le type de document
  function renderDocument(doc) {
    if (doc.type === "audio-lecteur") {
      return (
        <div key={doc.id} className={styles.lecteurAudio}>
          <button
            type="button"
            className={styles.lecteurBouton}
            aria-label={audioEnCours ? "Mettre en pause" : "Lire"}
            onClick={basculerLecture}
          >
            {audioEnCours ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className={styles.lecteurInfos}>
            <div className={styles.lecteurLigneHaut}>
              <span className={styles.lecteurNom}>{doc.nom}</span>
              <span className={styles.lecteurTemps}>{doc.duree}</span>
            </div>
            <div className={styles.lecteurBarre}>
              <div className={styles.lecteurBarreRemplie} />
            </div>
          </div>
          <div className={`${styles.equaliseur} ${audioEnCours ? styles.equaliseurActif : ""}`}>
            <span /><span /><span /><span />
          </div>
          {/* Fichier d'exemple, uniquement pour la démonstration visuelle */}
          {/* TODO: remplacer par le vrai fichier audio du backend */}
          <audio
            ref={audioRef}
            src="/exemples/piano-accompagnement.mp3"
            onPlay={() => setAudioEnCours(true)}
            onPause={() => setAudioEnCours(false)}
            onEnded={() => setAudioEnCours(false)}
          />
        </div>
      );
    }

    if (doc.type === "youtube") {
      return (
        <div key={doc.id} className={styles.video}>
          {videoOuverte ? (
            <div className={styles.videoCadre}>
              {/* Vidéo d'exemple, uniquement pour la démonstration visuelle */}
              {/* TODO: remplacer par le vrai lien YouTube ajouté par l'utilisateur */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title={doc.nom}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button type="button" className={styles.videoApercu} onClick={() => setVideoOuverte(true)}>
              <span className={styles.videoJouer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className={styles.videoLegende}>
                <span className={styles.videoLabel}>Lien YouTube</span>
                <span className={styles.videoTitre}>{doc.nom}</span>
              </span>
            </button>
          )}
          <div className={styles.videoBas}>
            <span className={styles.videoBadge}>YouTube</span>
            <span className={styles.videoMeta}>{doc.meta}</span>
            {/* TODO: supprimer réellement le document (backend) */}
            <button type="button" className={styles.documentSupprimerVideo} aria-label="Supprimer">
              <IconeSupprimer />
            </button>
          </div>
        </div>
      );
    }

    return <DocumentSimple key={doc.id} doc={doc} />;
  }

  return (
    <>
      <Header connecte />
      <main>
        <div className={styles.contenu}>
          <Link href="/mes-morceaux" className={styles.retour}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Mes morceaux
          </Link>

          {/* En-tête du morceau */}
          <div className={styles.hero}>
            <div className={styles.heroTexte}>
              <div className={styles.heroLigneHaut}>
                <span className={styles.heroGenre} style={{ background: MORCEAU.genreFond, color: MORCEAU.genreCouleur }}>
                  {MORCEAU.genre}
                </span>
                <span className={styles.heroEnsemble}>{MORCEAU.ensemble}</span>
              </div>
              <h1 className={styles.heroTitre}>{MORCEAU.titre}</h1>
              <p className={styles.heroCompositeur}>{MORCEAU.compositeur}</p>
              <p className={styles.heroDescription}>{MORCEAU.description}</p>
            </div>
            <div className={styles.boutonAjouter}>
              {/* TODO: ouvrir le formulaire d'ajout de document */}
              <Bouton variante="primaire">+ Ajouter un document</Bouton>
            </div>
          </div>

          <div className={styles.grillePrincipale}>
            {/* Documents groupés par pupitre */}
            <div>
              {GROUPES_DOCUMENTS.map((groupe) => (
                <div key={groupe.pupitre} className={styles.groupe}>
                  <div className={styles.groupeEnTete}>
                    <span className={styles.groupePoint} style={{ background: COULEUR_POINT_GROUPE[groupe.pupitre] }} />
                    <h2
                      className={styles.groupeTitre}
                      style={{ color: COULEUR_TITRE_GROUPE[groupe.pupitre] }}
                    >
                      {LIBELLE_GROUPE[groupe.pupitre]}
                    </h2>
                    <span className={styles.groupeCompte}>
                      {groupe.documents.length} document{groupe.documents.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className={styles.groupeListe}>
                    {groupe.documents.map((doc) => renderDocument(doc))}
                  </div>
                </div>
              ))}
            </div>

            {/* Colonne latérale : récapitulatif + astuce */}
            <aside className={styles.aside}>
              <div className={styles.asideCarte}>
                <h3 className={styles.asideTitre}>Documents par pupitre</h3>
                <div className={styles.asideListe}>
                  {["soprano", "alto", "tenor", "basse"].map((pupitre) => (
                    <div key={pupitre} className={styles.asideLigne}>
                      <span className={styles.asideLibelle}>
                        <span className={styles.asidePoint} style={{ background: COULEUR_POINT_GROUPE[pupitre] }} />
                        {LIBELLE_GROUPE[pupitre]}
                      </span>
                      <span className={styles.asideCompte}>
                        {GROUPES_DOCUMENTS.find((g) => g.pupitre === pupitre).documents.length}
                      </span>
                    </div>
                  ))}
                  <div className={`${styles.asideLigne} ${styles.asideLigneTotal}`}>
                    <span className={styles.asideLibelle}>
                      <span className={styles.asidePoint} style={{ background: "var(--yellow)" }} />
                      Tous
                    </span>
                    <span className={styles.asideCompte}>
                      {GROUPES_DOCUMENTS.find((g) => g.pupitre === "tous").documents.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.astuce}>
                <div className={styles.astuceTitre}>Astuce</div>
                <p className={styles.astuceTexte}>
                  Chaque membre ne voit en priorité que les documents de son pupitre. Les fichiers
                  « Tous » sont visibles par l&apos;ensemble du chœur.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
