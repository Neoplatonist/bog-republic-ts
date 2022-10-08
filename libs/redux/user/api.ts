import clientApi from '../clientApi';

const UserApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `/user`,
      providesTags: ['UserApi'],
    }),
  }),
});

export const { useGetUserQuery } = UserApi;

export default UserApi;
