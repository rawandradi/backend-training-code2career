import { CreateCourseDTO, UpdateCourseDTO } from "./course.dto";
import { CustomError } from "../shared/utils/exception";
import { prisma } from "../shared/db";
import { Prisma } from "@prisma/client";

const safeCourseSelect = {
  id: true,
  title: true,
  description: true,
  image: true,
  creatorId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CourseSelect;

type SafeCourse = Prisma.CourseGetPayload<{ select: typeof safeCourseSelect }>;

export class CourseService {
    async createCourse(userId: string, data: CreateCourseDTO): Promise<SafeCourse> {
        const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image ?? null,
        creatorId: userId,
      },
      select: safeCourseSelect,
    });
    return course;
  }

    async getCourses(): Promise<SafeCourse[]> {
    return prisma.course.findMany({ select: safeCourseSelect, orderBy: { createdAt: "desc" } });
  }

    async getCourseById(id: string): Promise<SafeCourse> {
        const course = await prisma.course.findUnique({ where: { id }, select: safeCourseSelect });
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        return course;
    }

    async updateCourse(userId: string,role: "ADMIN" | "COACH" | "STUDENT",id: string, data: UpdateCourseDTO): Promise<SafeCourse> {
        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        if (role !== "ADMIN" && course.creatorId !== userId) {
      throw new CustomError("Forbidden", "COURSE", 403);}



        const updated = await prisma.course.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.image !== undefined && { image: data.image }),
      },
      select: safeCourseSelect,
    });

    return updated;
    }

    async deleteCourse(userId: string,role: "ADMIN" | "COACH" | "STUDENT", id: string): Promise<void> {
        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) throw new CustomError("Course not found", "COURSE", 404);

         if (role !== "ADMIN" && course.creatorId !== userId) {
      throw new CustomError("Forbidden", "COURSE", 403);
    }

        await prisma.course.delete({ where: { id } });
    }
}

export const courseService = new CourseService();