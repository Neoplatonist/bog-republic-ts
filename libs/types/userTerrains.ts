import { z } from 'zod';

// Create Zod schema for UserTerrainData
export const UserTerrainDataSchema = z.object({
  currentIncome: z.number(),
  currentIncomeNotation: z.number(),
  nextCost: z.number(),
  nextCostNotation: z.number(),
  numberOwned: z.number(),
  isContributionLocked: z.boolean(),
  isManaged: z.boolean(),
});

// Base user terrain metadata schema
export const UserTerrainMetadataSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  terrainId: z.number(),
});

// Combined schema that uses composition to avoid duplication
export const UserTerrainsObjectSchema = UserTerrainMetadataSchema.merge(
  UserTerrainDataSchema
);

export const UserTerrainsObjectListSchema = z.array(UserTerrainsObjectSchema);

// TypeScript types derived from Zod schemas
export type UserTerrainData = z.infer<typeof UserTerrainDataSchema>;
export type UserTerrainMetadata = z.infer<typeof UserTerrainMetadataSchema>;
export type UserTerrainsObject = z.infer<typeof UserTerrainsObjectSchema>;
export type UserTerrainsObjectList = z.infer<
  typeof UserTerrainsObjectListSchema
>;
