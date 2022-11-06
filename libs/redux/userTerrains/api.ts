import clientApi from '../clientApi';

const UserTerrainsApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getUserTerrains: build.query({
      query: () => `/user-terrain`,
      providesTags: ['UserTerrainsApi'],
    }),
  }),
});

export const { useGetUserTerrainsQuery } = UserTerrainsApi;

export default UserTerrainsApi;
