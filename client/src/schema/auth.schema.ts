import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const newAdminSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "STAFF"]),
  isActive: z.string().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type NewAdminSchemaType = z.infer<typeof newAdminSchema>;
