import * as Zod from "zod";

export const createCourseSchema = Zod.object({
    title: Zod.string().min(3),
    description :Zod.string().min(10),
    image: Zod.string().url().optional(),
});

export const updateCourseSchema = Zod.object({
  title: Zod.string().min(3).optional(),
  description: Zod.string().min(10).optional(),
  image: Zod.string().url().optional(), 
});

export type CreateCourseDTO = Zod.infer<typeof createCourseSchema>;
export type UpdateCourseDTO = Zod.infer<typeof updateCourseSchema>;
