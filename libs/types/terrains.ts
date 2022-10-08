import { z } from 'zod';
import { GuardianObjectSchema } from './guardians';

export const TerrainObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  coefficient: z.number(),
  baseCost: z.number(),
  baseCostNotation: z.number(),
  income: z.number(),
  incomeNotation: z.number(),
  waitTime: z.number(),
  guardian: GuardianObjectSchema,
});

export const TerrainObjectListSchema = z.array(TerrainObjectSchema);

export type TerrainObject = z.infer<typeof TerrainObjectSchema>;
export type TerrainObjectList = z.infer<typeof TerrainObjectListSchema>;
