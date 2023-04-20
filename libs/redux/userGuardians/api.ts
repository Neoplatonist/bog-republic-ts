import clientApi from '../clientApi';


const UserGuardiansApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getUserGuardians: build.query({
      query: () => `/guardian`,
      providesTags: ['UserGuardiansApi'],
    }),
  }),
});


export const { useGetUserGuardiansQuery } = UserGuardiansApi;

export default UserGuardiansApi;
