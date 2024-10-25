import clientApi from '../clientApi';

/**
 * UserApi is an instance of the clientApi with predefined endpoints for user-related operations.
 * It provides query and mutation functions to interact with the user API endpoints.
 */
const UserApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * getUser is a query endpoint that retrieves user data.
     * It uses the GET method and specifies the URL as '/user'.
     * It also provides the 'UserApi' tag to enable cache invalidation.
     */
    getUser: build.query({
      query: () => '/user',
      providesTags: ['UserApi'],
    }),
    /**
     * userLogin is a mutation endpoint for user login.
     * It uses the POST method and specifies the URL as '/user/login'.
     * It invalidates the 'UserApi' tag to trigger cache invalidation.
     */
    userLogin: build.mutation({
      query: () => ({
        url: `/user/login`,
        method: 'POST',
      }),
      invalidatesTags: ['UserApi'],
    }),
  }),
});

// Extract the generated query and mutation hooks from UserApi
export const { useGetUserQuery, useUserLoginMutation } = UserApi;

export default UserApi;
