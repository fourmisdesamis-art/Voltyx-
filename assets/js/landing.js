import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("year").textContent = new Date().getFullYear();

const navLogin = document.getElementById("nav-login");
const navAvatar = document.getElementById("nav-avatar");
const navAvatarImg = document.getElementById("nav-avatar-img");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    navLogin.hidden = true;
    navAvatar.hidden = false;

    // Récupérer l'avatar depuis Firestore
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : {};
    navAvatarImg.src = data.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(data.username || user.email);
  } else {
    navLogin.hidden = false;
    navAvatar.hidden = true;
  }
});
