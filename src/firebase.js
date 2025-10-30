// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHgyZkker0-vIEc-q6Y9_u39rinftBGjk",
  authDomain: "blue-peak-web-solutions.firebaseapp.com",
  projectId: "blue-peak-web-solutions",
  storageBucket: "blue-peak-web-solutions.firebasestorage.app",
  messagingSenderId: "633250617689",
  appId: "1:633250617689:web:db860b8d922d5327779448",
  measurementId: "G-PQFJ5TWE2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (guarded for non-browser/unsupported contexts)
let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    // Analytics may fail on non-HTTPS origins or unsupported environments; safe to ignore
  }
}

// Initialize Firestore
export const db = getFirestore(app);

export { analytics };
export default app;
