import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDixM3YTaMUNFzN_7YEggiW74mKkHfhw7Y",
  authDomain: "cac-dashboard-36cae.firebaseapp.com",
  projectId: "cac-dashboard-36cae",
  storageBucket: "cac-dashboard-36cae.firebasestorage.app",
  messagingSenderId: "938405494217",
  appId: "1:938405494217:web:d8f9bdc25cd3a230bbbc18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };