import { z } from 'zod';
import { TerrainObjectSchema } from './terrains';
import { UserTerrainDataSchema } from './userTerrains';

// Define the CombinedTerrain schema
export const CombinedTerrainSchema = TerrainObjectSchema.extend({
  userTerrain: UserTerrainDataSchema,
});

// Create a type from the schema
export type CombinedTerrain = z.infer<typeof CombinedTerrainSchema>;
