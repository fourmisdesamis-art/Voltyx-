import { auth, db } from "./firebase-config.js";
import { requireAuth, logout } from "./auth.js";
import {
  doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Protège la page et charge les données
requireAuth((user, data) => {
  document.getElementById("username").value = data.username || user.displayName || "";
  document.getElementById("email").value = user.email;
});

document.getElementById("logout-btn").addEventListener("click", logout);

document.getElementById("save-general").addEventListener("click", async () => {
  const user = auth.currentUser;
  const username = document.getElementById("username").value.trim();

  await updateProfile(user, { displayName: username });
  await updateDoc(doc(db, "users", user.uid), { username });

  alert("Modifications enregistrées !");
});

document.getElementById("change-password").addEventListener("click", async () => {
  await sendPasswordResetEmail(auth, auth.currentUser.email);
  alert("Un email de réinitialisation t'a été envoyé.");
});
