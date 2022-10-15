import clientApi from '../clientApi';

const UserGuardiansAPI = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getuserGuardians: build.query({
      query: () => `/guardian`,
      providesTags: ['UserGuardiansAPI'],
    }),
  }),
});

export const { useGetuserGuardiansQuery } = UserGuardiansAPI;

export default UserGuardiansAPI;
