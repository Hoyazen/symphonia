const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  || (process.env.NODE_ENV === "development" ? "http://localhost:8080" : "");

// Appelle l'API backend et transforme les erreurs métier en Error lisible
async function callApi(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Une erreur est survenue, réessaie plus tard.");
  }

  return data;
}

export function register({ firstName, lastName, email, password }) {
  return callApi("/api/auth/inscription", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
}

export function login({ email, password }) {
  return callApi("/api/auth/connexion", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function validateAccount(token) {
  return callApi(`/api/auth/validation?token=${encodeURIComponent(token)}`, {
    method: "GET",
  });
}
