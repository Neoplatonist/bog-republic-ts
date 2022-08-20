import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  AuthProvider,
} from 'firebase/auth';
import firebaseConfig from './appConfig';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const providers: AuthProvider[] = [
  new FacebookAuthProvider(),
  new GoogleAuthProvider(),
];

export { app, auth, providers };
