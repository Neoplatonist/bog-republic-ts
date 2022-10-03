import { z } from 'zod';

export const GuardianObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  terrain_id: z.number(),
  cost: z.number(),
  cost_notation: z.number(),
});

export const GuardianObjectListSchema = z.array(GuardianObjectSchema);

export type GuardianObject = z.infer<typeof GuardianObjectSchema>;
export type GuardianObjectList = z.infer<typeof GuardianObjectListSchema>;
