/**
 * This file is a work in progress.
 */

import axios from '@/libs/axios';
import { AuthProvider } from 'firebase/auth';

/**
 * Sets up the configuration for the FirebaseUI widget.
 * It includes login options and callbacks.
 *
 * @export
 * @param {AuthProvider[]} providers
 */
const uiConfig = (providers: AuthProvider[]) => ({
  signInFlow: 'popup',
  signInSuccessUrl: '/login',
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
  signInOptions: providers.map((provider) => provider.providerId),
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    signInSuccessWithAuthResult: (authResult: any, redirectUrl?: any) => {
      // eslint-disable-next-line no-unused-vars
      const { user, credential } = authResult;
      // eslint-disable-next-line prefer-destructuring
      const isNewUser = authResult.additionalUserInfo.isNewUser;

      // use .then solution instead of async/await
      user.getIdToken().then((idToken: string) => {
        if (isNewUser) {
          // is a new user, creates new user on server
          axios.post(
            '/user',
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
        } else {
          // not a new user, just updated the last login timestamp
          // might not be needed
          axios.post(
            '/user/login',
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
        }
      });

      if (!isNewUser) return true;

      return false;
    },
  },
});

export default uiConfig;
