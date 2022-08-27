import clientApi from '../clientApi';

const TerrainsApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getTerrains: build.query({
      query: () => `/terrain`,
      providesTags: ['TerrainsApi'],
    }),
  }),
});

export const { useGetTerrainsQuery } = TerrainsApi;

export default TerrainsApi;
