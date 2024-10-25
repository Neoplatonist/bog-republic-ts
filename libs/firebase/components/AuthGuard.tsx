'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/libs/firebase/firebaseApp';
import { useAppThunkDispatch } from '@/libs/redux';
import UserApi, { useGetUserQuery } from '@/libs/redux/user/api';
import Loading from '@/components/loading';
import { User } from 'firebase/auth';

interface AuthGuardProps {
  children: ReactElement;
  // eslint-disable-next-line react/require-default-props
  passthrough?: boolean;
}

type UserState = User | null;

/**
 * Wrapper component that checks whether a user is logged in or not.
 * If the user is not logged in, it will redirect to the login page.
 * If the user is logged in, it will render the children components.
 *
 * @export
 * @param {AuthGuardProps} { children, passthrough = false }
 * @returns {ReactElement}
 */
const AuthGuard: FC<AuthGuardProps> = ({ children, passthrough = false }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const dispatch = useAppThunkDispatch();
  const { data: serverUser, error: serverError } = useGetUserQuery('');

  // Detects changes as to whether the user is not logged in.
  // If not logged in, redirect to the login page.
  useEffect(() => {
    const handleAuthError = (_authError: Error) => {
      console.error('auth error', _authError);

      // clear localstorage
      localStorage.setItem('tokenId', '');
      // firebase signout
      auth.signOut();
      // redirect to login
      router.push('/login');
    };

    const handleAuthStateChanged = async (_userState: UserState) => {
      if (!_userState) {
        router.push('/login');
        return;
      }

      // get the user's tokenId and store it in localstorage
      const token = JSON.stringify(await _userState?.getIdToken());
      const tokenId = token !== '' ? JSON.parse(token) : '';
      localStorage.setItem('tokenId', tokenId);

      // If the user is logged in with firebase, but not the server.
      // Then try logging in with the server.
      // If the server login fails, then log out of firebase.
      if (!serverUser && !serverError) {
        const { error }: any = await dispatch(UserApi.endpoints.userLogin.initiate(''));

        if (error) {
          console.error('dispatch UserApi error', error);
          handleAuthError(error);
        };
      }
    };

    // watches for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged, handleAuthError);

    // unsubscribe to the auth listener when unmounting
    return () => unsubscribe();
  }, [dispatch, router, serverError, serverUser]);

  // These two Loading components need the isServer flag set to true,
  // otherwise the server complains that the client and server are different.
  // Maybe in Production, change window to be 'Window is Loading'
  if (typeof window === 'undefined')
    return <Loading text='Window is Loading' isServer />;

  const isTokenLocal = localStorage?.getItem('tokenId');
  if (loading || !user || !isTokenLocal || passthrough)
    return <Loading text='AuthGuard is Loading' isServer />;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default AuthGuard;
