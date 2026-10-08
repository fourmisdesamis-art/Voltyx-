import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "/settings";
});

const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/settings";
  } catch (err) {
    errorEl.textContent = traduireErreur(err.code);
  }
});

function traduireErreur(code) {
  const messages = {
    "auth/invalid-email": "Email invalide.",
    "auth/user-not-found": "Aucun compte avec cet email.",
    "auth/wrong-password": "Mot de passe incorrect.",
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/too-many-requests": "Trop de tentatives. Réessaie plus tard."
  };
  return messages[code] || "Une erreur est survenue.";
}
