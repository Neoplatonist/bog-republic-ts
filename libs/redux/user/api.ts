import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';

const UserApi = clientApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUser: build.query({
      query: () => '/users',
      providesTags: ['UserApi'],
    }),
    userLogin: build.mutation({
      query: () => ({
        url: `/users/login`,
        method: 'POST',
      }),
      invalidatesTags: ['UserApi'],
    }),
  }),
});

export const { useGetUserQuery, useUserLoginMutation } = UserApi;

export default UserApi;
