import { z } from 'zod';

export const GuardianObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  terrainId: z.number(),
  cost: z.number(),
  costNotation: z.number(),
});

export const GuardianObjectListSchema = z.array(GuardianObjectSchema);

export type GuardianObject = z.infer<typeof GuardianObjectSchema>;
export type GuardianObjectList = z.infer<typeof GuardianObjectListSchema>;
