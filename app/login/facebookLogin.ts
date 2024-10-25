'use client';

import { FacebookAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { auth } from '@/libs/firebase/firebaseApp';
import { store } from '@/libs/redux';
import UserApi from '@/libs/redux/user/api';

type FacebookLoginResponse = Error | null;

async function FacebookLogin(): Promise<FacebookLoginResponse> {
  const provider = new FacebookAuthProvider();

  try {
    const response = await signInWithPopup(auth, provider);
    const user: User = await response.user;
    const tokenId = await user.getIdToken();

    localStorage.setItem('tokenId', tokenId);
    store.dispatch(UserApi.endpoints.userLogin.initiate(''));

    return null;
  } catch (error) {
    console.error('Facebook Login Error:', error);
    return new Error('Facebook Login Error');
  }
}

export default FacebookLogin;
