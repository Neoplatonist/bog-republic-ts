import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';

const UserGuardiansApi = clientApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUserGuardians: build.query({
      query: () => `/guardian`,
      providesTags: ['UserGuardiansApi'],
    }),
  }),
});

export const { useGetUserGuardiansQuery } = UserGuardiansApi;

export default UserGuardiansApi;
