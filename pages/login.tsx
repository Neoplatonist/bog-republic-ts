import React, { useEffect } from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, providers } from '@/libs/firebase/firebaseApp';
import uiConfig from '@/libs/firebase/authUiConfig';
import StyledFirebaseAuth from '@/libs/firebase/components/StyledFirebaseAuth';

const Login: NextPage = () => {
  const router = useRouter();
  const authConfig = uiConfig(providers);
  // eslint-disable-next-line no-unused-vars
  const [_, loading, error] = useAuthState(auth);

  // Detects changes in the user's authentication state.
  // If the user is logged in, redirect to the game.
  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          router.push('/game');
        }
      },
      (authError) => {
        console.log({ LoginError: authError });
      }
    );
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Login</h1>

      <StyledFirebaseAuth
        uiCallback={(ui) => ui.disableAutoSignIn()}
        uiConfig={authConfig}
        firebaseAuth={auth}
      />
    </div>
  );
};

export default Login;
