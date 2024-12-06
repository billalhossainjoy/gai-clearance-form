import { z } from "zod";

export const createSignetureRowSchema = z.object({
  id: z.string().optional(),
  labelId: z.number(),
  serial: z.string(),
  depertment: z.string(),
  depertmentId: z.array(z.enum(["PT", "CST", "GD"])),
});

export const updateSignetureRowSchema = z.object({
  labelId: z.number(),
  serial: z.string(),
  depertment: z.string(),
  depertmentId: z.array(z.enum(["PT", "CST", "GD"])),
});

export type createSignetureRowSchemaType = z.infer<
  typeof createSignetureRowSchema
>;
export type updateSignetureRowSchemaType = z.infer<
  typeof updateSignetureRowSchema
>;
