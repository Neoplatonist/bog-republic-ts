import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';

const TerrainsApi = clientApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getTerrains: build.query({
      query: () => `/terrain`,
      providesTags: ['TerrainsApi'],
    }),
  }),
});

export const { useGetTerrainsQuery } = TerrainsApi;

export default TerrainsApi;
