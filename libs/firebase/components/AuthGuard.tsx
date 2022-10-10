import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/libs/firebase/firebaseApp';
import { useAppThunkDispatch } from '@/libs/redux';
import UserApi, { useGetUserQuery } from '@/libs/redux/user/api';

interface Props {
  children: JSX.Element;
}

/**
 * Wrapper component that checks whether a user is logged in or not.
 * If the user is not logged in, it will redirect to the login page.
 * If the user is logged in, it will render the children components.
 *
 * @export
 * @param {Props} { children }
 * @returns
 */
const AuthGuard = ({ children }: Props) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const dispatch = useAppThunkDispatch();
  const { data: serverUser } = useGetUserQuery('');

  // Detects changes as to whether the user is not logged in.
  // If not logged in, redirect to the login page.
  useEffect(() => {
    auth.onAuthStateChanged(
      async (_userState) => {
        if (!_userState) {
          router.push('/login');
          return;
        }

        const token = JSON.stringify(await _userState?.getIdToken());
        const idToken = token !== '' ? JSON.parse(await token) : '';
        localStorage.setItem('idToken', idToken);

        // If the user is logged in with firebase, but not the server.
        if (!serverUser) {
          dispatch(UserApi.endpoints.userLogin.initiate(''));
        }
      },
      // eslint-disable-next-line no-unused-vars
      (_authError) => {
        localStorage.setItem('idToken', '');
        router.push('/login');
      }
    );
  }, [dispatch, router, serverUser]);

  // if auth initialized with a valid user show protected page
  if (!loading && user) {
    return children;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
