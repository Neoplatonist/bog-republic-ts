import api from '../api';

const testApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query({
      query: (id) => `posts/${id}`,
      providesTags: ['Test'],
    })
  }),
});

export const { useGetPostQuery } = testApi;

export default testApi;
