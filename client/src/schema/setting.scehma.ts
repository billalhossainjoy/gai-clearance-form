import { z } from "zod";

export const authorPassword = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password is not matched.",
  });


  export type AuthorPasswordType = z.infer<typeof authorPassword>