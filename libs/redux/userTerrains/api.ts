import clientApi from '../clientApi';

const UserTerrainsApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getuserTerrains: build.query({
      query: () => `/user-terrain`,
      providesTags: ['UserTerrainsApi'],
    }),
  }),
});

export const { useGetuserTerrainsQuery } = UserTerrainsApi;

export default UserTerrainsApi;
