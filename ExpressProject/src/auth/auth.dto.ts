import * as Zod from "zod";

export const registerSchema = Zod.object({
  name: Zod.string().min(3),
  email: Zod.string().email(),
  password: Zod.string().min(8),
});

export const loginSchema = Zod.object({
  email: Zod.string().email(),
  password: Zod.string().min(6),
});

export type RegisterDTO = Zod.infer<typeof registerSchema>;
export type LoginDTO = Zod.infer<typeof loginSchema>;
