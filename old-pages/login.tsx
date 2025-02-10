import React from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const router = useRouter();

  // Detects changes in the user's authentication state.
  // If the user is logged in, redirect to the game.
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Login</h1>

    </div>
  );
};

export default Login;
