import z from "zod";
import { Level, Semester, Role, Course } from "@prisma/client";

export const AuthSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),

  lastName: z.string().min(1, {
    message: "First name is required",
  }),

  email: z.string().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password is required",
  }),
  currentLevel: z.nativeEnum(Level).nullable(),

  semester: z.nativeEnum(Semester),

  course: z.nativeEnum(Course),

  role: z.nativeEnum(Role),
});

export type TAuthSchema = z.infer<typeof AuthSchema>;
