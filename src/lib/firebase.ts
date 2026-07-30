import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  browserLocalPersistence, 
  browserPopupRedirectResolver,
  getAuth 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Explicitly initialize auth with persistence to prevent assertion errors
export const auth = (() => {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    try {
      return getAuth(existingApps[0]);
    } catch (e) {
      // Fallback
    }
  }
  
  return initializeAuth(app, {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
  });
})();

