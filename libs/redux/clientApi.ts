import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_backendAPI || 'http://localhost:3001',
  // eslint-disable-next-line no-unused-vars
  prepareHeaders: (headers, { getState }) => {
    // Get the token from local storage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('idToken');
      if (token) headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Create a baseQuery instance with retry
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

/**
 * Create a base API to inject endpoints into from another file.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded.
 */
const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['TerrainsApi', 'UserApi'],
  /**
   * This api has endpoints injected from other files,
   * which is why no endpoints are defined here.
   * If you want all endpoints defined in the same file,
   * they could be included here instead.
   */
  endpoints: () => ({}),

  // Rehydrates the api store from the server
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export default clientApi;
