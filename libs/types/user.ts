import { z } from 'zod';

export const UserObjectSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  flags: z.number(),
  mycelium: z.number(),
  myceliumNotation: z.number(),
  permissions: z.null(),
  userTerrains: z.null(),
});

export const UserObjectListSchema = z.array(UserObjectSchema);

export type UserObject = z.infer<typeof UserObjectSchema>;
export type UserObjectList = z.infer<typeof UserObjectListSchema>;
