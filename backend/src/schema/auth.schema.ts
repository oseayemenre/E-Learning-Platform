import z from "zod";

export const AuthSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type TAuthSchema = z.infer<typeof AuthSchema>;
