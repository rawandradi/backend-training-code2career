import * as Zod from "zod";


export const updateProfileSchema = Zod.object({
    name: Zod.string().min(3),
    email:Zod.string().email().optional(),
    password: Zod.string().min(8).optional(),
});

export const createCoachSchema = Zod.object({
  name: Zod.string().min(3),
  email: Zod.string().email(),
  password: Zod.string().min(8),
});

export type UpdateProfileDTO = Zod.infer<typeof updateProfileSchema>;
export type CreateCoachDTO = Zod.infer<typeof createCoachSchema>;