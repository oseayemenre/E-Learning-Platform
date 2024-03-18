import { Role } from "@prisma/client";
import { z } from "zod";

export const meetingSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),

  meetingTime: z.string().min(1, {
    message: "Meeting Time cannot be empty",
  }),

  meetingDuration: z.string().min(1, {
    message: "Meeting duration cannot be empty",
  }),
});

export const roleSchema = z.object({
  role: z.nativeEnum(Role),
});

export type TMeetingSchema = z.infer<typeof meetingSchema>;
export type TRoleSchema = z.infer<typeof roleSchema>;
