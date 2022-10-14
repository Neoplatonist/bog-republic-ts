import clientApi from '../clientApi';

const userGuardiansApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getuserGuardians: build.query({
      query: () => `/terrain`,
      providesTags: ['userGuardiansApi'],
    }),
  }),
});

export const { useGetuserGuardiansQuery } = userGuardiansApi;

export default userGuardiansApi;
