import { z } from 'zod';

export const UserTerrainSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  terrainId: z.number(),
  currentIncome: z.number(),
  currentIncomeNotation: z.number(),
  nextCost: z.number(),
  nextCostNotation: z.number(),
  number_owned: z.number(),
  isManaged: z.boolean(),
  isContributionLocked: z.boolean(),
});

export const UserTerrainListSchema = z.array(UserTerrainSchema);

export type UserTerrain = z.infer<typeof UserTerrainSchema>;
export type UserTerrainList = z.infer<typeof UserTerrainListSchema>;
