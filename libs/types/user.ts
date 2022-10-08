import { z } from 'zod';

export const UserObjectSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
  username: z.string(),
  email: z.string(),
  flags: z.number(),
  mycelium: z.number(),
  mycelium_notation: z.number(),
  permissions: z.null(),
  user_terrains: z.null(),
});

export const UserObjectListSchema = z.array(UserObjectSchema);

export type UserObject = z.infer<typeof UserObjectSchema>;
export type UserObjectList = z.infer<typeof UserObjectListSchema>;
