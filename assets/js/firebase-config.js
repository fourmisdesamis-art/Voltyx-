// Import des modules Firebase (version modulaire, la plus récente)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIs1SHpwMB_M2U0J-xGu6QE1XmFe6jRLE",
  authDomain: "voltyx-studios.firebaseapp.com",
  projectId: "voltyx-studios",
  storageBucket: "voltyx-studios.firebasestorage.app",
  messagingSenderId: "354640586726",
  appId: "1:354640586726:web:8c6bc8e72433196dadd827",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
