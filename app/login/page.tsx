'use client';

import React, { MouseEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/libs/firebase/firebaseApp';

// Function Imports
import cx from '@/libs/cx';
import Loading from '../../components/loading';
import GoogleLogin from './googleLogin';
import FacebookLogin from './facebookLogin';

// Style Imports
import styles from './styles.module.css';

// Media Imports
import GoogleLogo from '../../public/images/google.svg';
import FacebookLogo from '../../public/images/facebook.svg';

const LoginPage: NextPage = () => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const [serverError, setServerError] = useState<Error | null>(null);

  // Detects changes in the user's authentication state.
  // If the user is logged in, redirect to the game.
  // Probably should touch the selfhosted server to see if the user is logged in.
  if (user) {
    setTimeout(() => router.push('/game/dashboard'), 300);
    return <Loading text='From Login to Dashboard' />;
  }

  if (loading) return <Loading text='User is Loading' />;
  if (error || serverError) return <p>Error: There was an error logging in. Please try again.</p>;

  const handleGoogleLogin = async (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    setServerError(await GoogleLogin());
  };

  const handleFacebookLogin = async (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    setServerError(await FacebookLogin());
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>

      <div className={cx(styles.card, 'w-[90%] max-w-max -mt-32 p-16 bg-white rounded-lg')}>
        <h1 className='-mt-4 mb-16 text-center text-4xl font-semibold text-slate-950'>Login Page</h1>

        <ul className='w-full flex flex-col justify-center items-center gap-6'>
          {/* Google Login */}
          <li>
            <button
              type='button'
              onClick={handleGoogleLogin}
              className={cx(styles['google-btn'], styles.btn)}
            >
              <span className='mr-4'>
                <Image
                  src={GoogleLogo}
                  alt='Google'
                  height={20}
                  width={20}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </span>
              <span className=''>Sign in with Google</span>
            </button>
          </li>

          {/* Facebook Login */}
          <li>
            <button
              type='button'
              onClick={handleFacebookLogin}
              className={cx(styles['facebook-btn'], styles.btn)}
            >
              <span className='mr-4'>
                <Image
                  src={FacebookLogo}
                  alt='Facebook'
                  height={20}
                  width={20}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </span>
              <span className='text-white'>Sign in with Facebook</span>
            </button>
          </li>

          {/* Tagline */}
          <h5 className='mt-10 -mb-10'>Bog Republic &hearts; esoteric.garden</h5>
        </ul>
      </div>

    </div>
  );
};

export default LoginPage;
