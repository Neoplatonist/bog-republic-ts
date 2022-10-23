import clientApi from '../clientApi';

const UserTerriansAPI = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getuserTerrians: build.query({
      query: () => `/user-terrain`,
      providesTags: ['UserTerriansAPI'],
    }),
  }),
});

export const { useGetuserTerriansQuery } = UserTerriansAPI;

export default UserTerriansAPI;
