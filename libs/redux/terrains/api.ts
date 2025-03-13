import { EndpointBuilder } from '@reduxjs/toolkit/query';
import clientApi from '../clientApi';
import type { TerrainState } from './index';

const TerrainsApi = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getTerrains: build.query<TerrainState['data'], void>({
      query: () => '/terrains',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'TerrainsApi' as const, id })),
              { type: 'TerrainsApi', id: 'LIST' },
            ]
          : [{ type: 'TerrainsApi', id: 'LIST' }],
      keepUnusedDataFor: 3600, // Cache for 1 hour
    }),
  }),
  overrideExisting: false,
});

export const { useGetTerrainsQuery } = TerrainsApi;
export default TerrainsApi;
