import { v4 as uuidv4 } from "uuid";
import { GenericRepository } from "../shared/repository/GenericRepository";
import { Course } from "./course.types";
import { CreateCourseDTO, UpdateCourseDTO } from "./course.dto";
import { CustomError } from "../shared/utils/exception";
import { prisma } from "../shared/prisma";


export class CourseService {
    async createCourse(userId: string, data: CreateCourseDTO): Promise<Course> {
    const created = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image ?? null,
        creatorId: userId,
      },
    });
        return created as Course;
    }

    async getCourses(): Promise<Course[]> {
    const list = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return list as Course[];
  }

    async getCourseById(id: string): Promise<Course> {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new CustomError("Course not found", "COURSE", 404);
    return course as Course;
  }

    async updateCourse(userId: string, id: string, data: UpdateCourseDTO,role: "ADMIN"|"COACH"|"STUDENT"): Promise<Course> {
        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        const isAdmin = role === "ADMIN";
        if (!isAdmin && course.creatorId !== userId) {
            throw new CustomError("Forbidden", "COURSE", 403);
        }

        const updated = await prisma.course.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.image !== undefined && { image: data.image }),
      },
    });


        return updated as Course;
    }

    async deleteCourse(userId: string, id: string,role: "ADMIN"|"COACH"|"STUDENT"): Promise<void> {
        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        const isAdmin = role === "ADMIN";
        if (!isAdmin && course.creatorId !== userId) {
            throw new CustomError("Forbidden", "COURSE", 403);
        }

        await prisma.course.delete({ where: { id } });
    }
}

export const courseService = new CourseService();