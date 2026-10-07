import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ---------- Si déjà connecté, on redirige direct vers /settings ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "/settings";
});

/* ---------- Gestion des onglets ---------- */
const tabs = document.querySelectorAll(".auth-tab");
const forms = document.querySelectorAll(".auth-form");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    forms.forEach((f) => f.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
  });
});

/* ---------- Inscription ---------- */
const registerForm = document.getElementById("register-form");
const registerError = document.getElementById("register-error");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  registerError.textContent = "";

  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  try {
    // 1. Créer le compte Firebase Auth
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // 2. Mettre le pseudo dans le profil Auth
    await updateProfile(user, { displayName: username });

    // 3. Créer le document Firestore associé
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: serverTimestamp(),
      bio: "",
      avatarUrl: ""
    });

    // 4. Redirection
    window.location.href = "/settings";
  } catch (err) {
    registerError.textContent = traduireErreur(err.code);
  }
});

/* ---------- Connexion ---------- */
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/settings";
  } catch (err) {
    loginError.textContent = traduireErreur(err.code);
  }
});

/* ---------- Traduction des erreurs Firebase ---------- */
function traduireErreur(code) {
  const messages = {
    "auth/email-already-in-use": "Cet email est déjà utilisé.",
    "auth/invalid-email": "Email invalide.",
    "auth/weak-password": "Mot de passe trop faible (6 caractères min).",
    "auth/user-not-found": "Aucun compte avec cet email.",
    "auth/wrong-password": "Mot de passe incorrect.",
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/too-many-requests": "Trop de tentatives. Réessaie plus tard."
  };
  return messages[code] || "Une erreur est survenue. Réessaie.";
             }
