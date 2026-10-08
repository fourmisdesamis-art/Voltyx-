import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "/settings";
});

const form = document.getElementById("register-form");
const errorEl = document.getElementById("register-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, { displayName: username });

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: serverTimestamp(),
      bio: "",
      avatarUrl: ""
    });

    window.location.href = "/settings";
  } catch (err) {
    errorEl.textContent = traduireErreur(err.code);
  }
});

function traduireErreur(code) {
  const messages = {
    "auth/email-already-in-use": "Cet email est déjà utilisé.",
    "auth/invalid-email": "Email invalide.",
    "auth/weak-password": "Mot de passe trop faible (6 caractères min).",
    "auth/too-many-requests": "Trop de tentatives. Réessaie plus tard."
  };
  return messages[code] || "Une erreur est survenue.";
}
