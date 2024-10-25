'use client';

import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { auth } from '@/libs/firebase/firebaseApp';
import { store } from '@/libs/redux';
import UserApi from '@/libs/redux/user/api';

type GoogleLoginResponse = Error | null;

async function GoogleLogin(): Promise<GoogleLoginResponse> {
  const provider = new GoogleAuthProvider();

  try {
    const response = await signInWithPopup(auth, provider);
    const user: User = await response.user;
    const tokenId = await user.getIdToken();

    localStorage.setItem('tokenId', tokenId);
    store.dispatch(UserApi.endpoints.userLogin.initiate(''));

    return null;
  } catch (error) {
    console.error('Google Login Error:', error);
    return new Error('Google Login Error');
  }
}

export default GoogleLogin;
