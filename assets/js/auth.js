import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Protège une page : redirige vers l'accueil si non connecté
export function requireAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "/";
      return;
    }
    const snap = await getDoc(doc(db, "users", user.uid));
    callback(user, snap.exists() ? snap.data() : {});
  });
}

export function logout() {
  signOut(auth).then(() => {
    window.location.href = "/";
  });
      }
