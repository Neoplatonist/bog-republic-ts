import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';

const UserApi = clientApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUser: build.query({
      query: () => '/user',
      providesTags: ['UserApi'],
    }),
    userLogin: build.mutation({
      query: () => ({
        url: `/user/login`,
        method: 'POST',
      }),
      invalidatesTags: ['UserApi'],
    }),
  }),
});

export const { useGetUserQuery, useUserLoginMutation } = UserApi;

export default UserApi;
