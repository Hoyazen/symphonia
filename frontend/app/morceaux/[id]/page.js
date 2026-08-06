"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import InstrumentBadge from "@/components/InstrumentBadge";
import styles from "./page.module.css";

// Le morceau affiché et ses documents
// TODO: remplacer par les vraies données du backend (recherchées via l'id de la route)
const SONG = {
  title: "Ave Verum Corpus",
  genre: "Sacré · Motet",
  genreBackground: "var(--sop-bg)",
  genreColor: "var(--sop)",
  ensemble: "Chœur du Lac",
  composer: "Wolfgang Amadeus Mozart · K. 618",
  description:
    "Motet en ré majeur pour chœur à quatre voix et orgue, composé en 1791. Pièce douce et recueillie, idéale pour travailler l'homogénéité des pupitres et les nuances piano.",
};

// Documents groupés par pupitre. Types possibles :
// "pdf", "image", "audio-simple" (liste), "audio-lecteur" (lecteur complet), "youtube" (lecteur vidéo)
const DOCUMENT_GROUPS = [
  {
    instrument: "tous",
    documents: [
      { id: 1, type: "pdf", lastName: "Partition complète.pdf", meta: "PDF · ajouté le 10 avr. 2025 par Claire Dubois", instrument: "tous" },
      { id: 2, type: "audio-lecteur", lastName: "Piano d'accompagnement.mp3", duration: "1:12 / 3:04" },
      { id: 3, type: "youtube", lastName: "Ave Verum — King's College Choir", meta: "ajouté le 8 avr. 2025 par Marc Petit" },
    ],
  },
  {
    instrument: "soprano",
    documents: [
      { id: 4, type: "pdf", lastName: "AveVerum_Soprano.pdf", meta: "PDF · ajouté le 14 avr. 2025 par Claire Dubois", instrument: "soprano" },
      { id: 5, type: "audio-simple", lastName: "Soprano_guide.mp3", meta: "Audio · 2:48 · ajouté le 14 avr. 2025 par Claire Dubois", instrument: "soprano" },
    ],
  },
  {
    instrument: "alto",
    documents: [
      { id: 6, type: "pdf", lastName: "AveVerum_Alto.pdf", meta: "PDF · ajouté le 14 avr. 2025 par Sophie Marchand", instrument: "alto" },
    ],
  },
  {
    instrument: "tenor",
    documents: [
      { id: 7, type: "pdf", lastName: "AveVerum_Tenor.pdf", meta: "PDF · ajouté le 13 avr. 2025 par Julien Roy", instrument: "tenor" },
    ],
  },
  {
    instrument: "basse",
    documents: [
      { id: 8, type: "pdf", lastName: "AveVerum_Basse.pdf", meta: "PDF · ajouté le 13 avr. 2025 par Julien Roy", instrument: "basse" },
      { id: 9, type: "image", lastName: "Scan_annotations_basse.jpg", meta: "Image · ajouté le 12 avr. 2025 par Pierre Girard", instrument: "basse" },
    ],
  },
];

const GROUP_LABELS = { all: "Tous les pupitres", soprano: "Soprano", alto: "Alto", tenor: "Ténor", bass: "Basse" };
const GROUP_DOT_COLOR = { all: "var(--yellow)", soprano: "var(--sop-d)", alto: "var(--alt-d)", tenor: "var(--ten-d)", bass: "var(--bass-d)" };
const GROUP_TITLE_COLOR = { soprano: "var(--sop)", alto: "var(--alt)", tenor: "var(--ten)", bass: "var(--bass)" };

const TYPE_COLORS = {
  pdf: { background: "var(--doc-pdf-bg)", color: "var(--doc-pdf)" },
  image: { background: "var(--doc-image-bg)", color: "var(--doc-image)" },
  "audio-simple": { background: "var(--doc-audio-bg)", color: "var(--doc-audio)" },
};

// Icône de suppression, réutilisée sur chaque document
function DeleteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  );
}

// Ligne d'un document simple : PDF, image, ou audio sans lecteur complet
function SimpleDocument({ doc }) {
  const { background, color } = TYPE_COLORS[doc.type];

  return (
    <div className={styles.document}>
      <span className={styles.documentIcon} style={{ background: background, color: color }}>
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
      <div className={styles.documentText}>
        <div className={styles.documentName}>{doc.lastName}</div>
        <div className={styles.documentMeta}>{doc.meta}</div>
      </div>
      {doc.instrument && <InstrumentBadge instrument={doc.instrument} withDot={false} small />}
      {/* TODO: supprimer réellement le document (backend) */}
      <button type="button" className={styles.deleteDocumentButton} aria-label="Supprimer">
        <DeleteIcon />
      </button>
    </div>
  );
}

// Fiche morceau : détail d'un morceau avec ses documents et lecteurs
export default function SongDetailsPage() {
  const [currentAudio, setCurrentAudio] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const audioRef = useRef(null);

  function togglePlayback() {
    if (!audioRef.current) return;
    if (currentAudio) audioRef.current.pause();
    else audioRef.current.play();
  }

  // Choisit le bon rendu selon le type de document
  function renderDocument(doc) {
    if (doc.type === "audio-lecteur") {
      return (
        <div key={doc.id} className={styles.audioPlayer}>
          <button
            type="button"
            className={styles.playerButton}
            aria-label={currentAudio ? "Mettre en pause" : "Lire"}
            onClick={togglePlayback}
          >
            {currentAudio ? (
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
          <div className={styles.playerInfo}>
            <div className={styles.playerTopRow}>
              <span className={styles.playerName}>{doc.lastName}</span>
              <span className={styles.playerTime}>{doc.duration}</span>
            </div>
            <div className={styles.playerBar}>
              <div className={styles.playerBarFill} />
            </div>
          </div>
          <div className={`${styles.equalizer} ${currentAudio ? styles.activeEqualizer : ""}`}>
            <span /><span /><span /><span />
          </div>
          {/* Fichier d'exemple, uniquement pour la démonstration visuelle */}
          {/* TODO: remplacer par le vrai fichier audio du backend */}
          <audio
            ref={audioRef}
            src="/exemples/piano-accompagnement.mp3"
            onPlay={() => setCurrentAudio(true)}
            onPause={() => setCurrentAudio(false)}
            onEnded={() => setCurrentAudio(false)}
          />
        </div>
      );
    }

    if (doc.type === "youtube") {
      return (
        <div key={doc.id} className={styles.video}>
          {videoOpen ? (
            <div className={styles.videoFrame}>
              {/* Vidéo d'exemple, uniquement pour la démonstration visuelle */}
              {/* TODO: remplacer par le vrai lien YouTube ajouté par l'utilisateur */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title={doc.lastName}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button type="button" className={styles.videoPreview} onClick={() => setVideoOpen(true)}>
              <span className={styles.videoPlayButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className={styles.videoCaption}>
                <span className={styles.videoLabel}>Lien YouTube</span>
                <span className={styles.videoTitle}>{doc.lastName}</span>
              </span>
            </button>
          )}
          <div className={styles.videoBottom}>
            <span className={styles.videoBadge}>YouTube</span>
            <span className={styles.videoMeta}>{doc.meta}</span>
            {/* TODO: supprimer réellement le document (backend) */}
            <button type="button" className={styles.deleteVideoDocumentButton} aria-label="Supprimer">
              <DeleteIcon />
            </button>
          </div>
        </div>
      );
    }

    return <SimpleDocument key={doc.id} doc={doc} />;
  }

  return (
    <>
      <Header authenticated />
      <main>
        <div className={styles.content}>
          <Link href="/mes-morceaux" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Mes morceaux
          </Link>

          {/* En-tête du morceau */}
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <div className={styles.heroTopRow}>
                <span className={styles.heroGenre} style={{ background: SONG.genreBackground, color: SONG.genreColor }}>
                  {SONG.genre}
                </span>
                <span className={styles.heroEnsemble}>{SONG.ensemble}</span>
              </div>
              <h1 className={styles.heroTitle}>{SONG.title}</h1>
              <p className={styles.heroComposer}>{SONG.composer}</p>
              <p className={styles.heroDescription}>{SONG.description}</p>
            </div>
            <div className={styles.addButton}>
              {/* TODO: ouvrir le formulaire d'ajout de document */}
              <Button variant="primary">+ Ajouter un document</Button>
            </div>
          </div>

          <div className={styles.mainGrid}>
            {/* Documents groupés par pupitre */}
            <div>
              {DOCUMENT_GROUPS.map((group) => (
                <div key={group.instrument} className={styles.group}>
                  <div className={styles.groupHeader}>
                    <span className={styles.groupDot} style={{ background: GROUP_DOT_COLOR[group.instrument] }} />
                    <h2
                      className={styles.groupTitle}
                      style={{ color: GROUP_TITLE_COLOR[group.instrument] }}
                    >
                      {GROUP_LABELS[group.instrument]}
                    </h2>
                    <span className={styles.groupCount}>
                      {group.documents.length} document{group.documents.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className={styles.groupList}>
                    {group.documents.map((doc) => renderDocument(doc))}
                  </div>
                </div>
              ))}
            </div>

            {/* Colonne latérale : récapitulatif + astuce */}
            <aside className={styles.aside}>
              <div className={styles.asideCard}>
                <h3 className={styles.asideTitle}>Documents par pupitre</h3>
                <div className={styles.asideList}>
                  {["soprano", "alto", "tenor", "basse"].map((instrument) => (
                    <div key={instrument} className={styles.asideRow}>
                      <span className={styles.asideLabel}>
                        <span className={styles.asideDot} style={{ background: GROUP_DOT_COLOR[instrument] }} />
                        {GROUP_LABELS[instrument]}
                      </span>
                      <span className={styles.asideCount}>
                        {DOCUMENT_GROUPS.find((g) => g.instrument === instrument).documents.length}
                      </span>
                    </div>
                  ))}
                  <div className={`${styles.asideRow} ${styles.asideTotalRow}`}>
                    <span className={styles.asideLabel}>
                      <span className={styles.asideDot} style={{ background: "var(--yellow)" }} />
                      Tous
                    </span>
                    <span className={styles.asideCount}>
                      {DOCUMENT_GROUPS.find((g) => g.instrument === "tous").documents.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.tip}>
                <div className={styles.tipTitle}>Astuce</div>
                <p className={styles.tipText}>
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
