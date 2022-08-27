import { z } from 'zod';
import { GuardianObjectSchema } from './guardians';

export const TerrainObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  coefficient: z.number(),
  base_cost: z.number(),
  base_cost_notation: z.number(),
  income: z.number(),
  income_notation: z.number(),
  wait_time: z.number(),
  guardian: GuardianObjectSchema,
});

export const TerrainObjectListSchema = z.array(TerrainObjectSchema);

export type TerrainObject = z.infer<typeof TerrainObjectSchema>;
export type TerrainObjectList = z.infer<typeof TerrainObjectListSchema>;
