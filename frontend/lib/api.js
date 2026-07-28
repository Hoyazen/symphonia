const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Appelle l'API backend et transforme les erreurs métier en Error lisible
async function appelerApi(chemin, options) {
  const reponse = await fetch(`${API_BASE_URL}${chemin}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const corps = await reponse.json().catch(() => null);

  if (!reponse.ok) {
    throw new Error(corps?.erreur || "Une erreur est survenue, réessaie plus tard.");
  }

  return corps;
}

export function inscrire({ prenom, nom, email, motDePasse }) {
  return appelerApi("/api/auth/inscription", {
    method: "POST",
    body: JSON.stringify({ prenom, nom, email, motDePasse }),
  });
}

export function connecter({ email, motDePasse }) {
  return appelerApi("/api/auth/connexion", {
    method: "POST",
    body: JSON.stringify({ email, motDePasse }),
  });
}
