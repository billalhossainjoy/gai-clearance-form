import { z } from "zod";

export const studentSchema = z.object({
  name: z.string(),
  technology: z.string(),
  roll: z.number().min(100000, { message: "Roll must be minimum 6 digits." }),
  registrationNo: z.number().min(10, "Roll must be minimum 10 digits."),
  session: z.string(),
  shift: z.enum(["FIRST", "SECOND"]),
  active: z.boolean().optional(),
  blockReason: z.string().optional(),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
