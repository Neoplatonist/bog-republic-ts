import clientApi from '../clientApi';

/**
 * UserTerrainsApi is an API object that provides endpoints for user terrains.
 */
const UserTerrainsApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Endpoint for getting user terrains.
     */
    getUserTerrains: build.query({
      query: () => `/user-terrain`,
      providesTags: ['UserTerrainsApi'],
    }),
  }),
});

/**
 * Query hook for getting user terrains.
 */
export const { useGetUserTerrainsQuery } = UserTerrainsApi;

export default UserTerrainsApi;
