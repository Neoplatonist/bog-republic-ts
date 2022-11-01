import { z } from 'zod';

export const UserTerrainsObjectSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  terrainId: z.number(),
  currentIncome: z.number(),
  currentIncomeNotation: z.number(),
  nextCost: z.number(),
  nextCostNotation: z.number(),
  numberOwned: z.number(),
  isManaged: z.boolean(),
  isContributionLocked: z.boolean(),
});

export const UserTerrainsObjectListSchema = z.array(UserTerrainsObjectSchema);

export type UserTerrainsObject = z.infer<typeof UserTerrainsObjectSchema>;
export type UserTerrainsObjectList = z.infer<
  typeof UserTerrainsObjectListSchema
>;
