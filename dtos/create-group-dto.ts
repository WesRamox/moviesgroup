import { z } from "zod"

export const createGroupSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(["COUPLE", "FRIENDS", "FAMILY"]),
})

export type CreateGroupDTO = z.infer<typeof createGroupSchema>;