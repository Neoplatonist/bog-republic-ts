import clientApi from '../clientApi';

const UserGuardiansAPI = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getUserGuardians: build.query({
      query: () => `/guardian`,
      providesTags: ['UserGuardiansApi'],
    }),
  }),
});

export const { useGetUserGuardiansQuery } = UserGuardiansAPI;

export default UserGuardiansAPI;
