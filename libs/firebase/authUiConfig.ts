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
});

export default uiConfig;
