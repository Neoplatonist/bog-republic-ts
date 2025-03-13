import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';

const UserTerrainsApi = clientApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUserTerrains: build.query({
      query: () => `/user-terrains`,
      providesTags: ['UserTerrainsApi'],
    }),
  }),
});

export const { useGetUserTerrainsQuery } = UserTerrainsApi;

export default UserTerrainsApi;
