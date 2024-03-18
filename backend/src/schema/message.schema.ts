import z from "zod";

export const messageSchema = z.object({
  message: z.string().min(1),
});

export type TMessageSchema = z.infer<typeof messageSchema>;
