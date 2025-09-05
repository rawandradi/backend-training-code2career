import { v4 as uuidv4 } from "uuid";
import { GenericRepository } from "../shared/repository/GenericRepository";
import { Course } from "./course.types";
import { CreateCourseDTO, UpdateCourseDTO } from "./course.dto";
import { CustomError } from "../shared/utils/exception";

export const courseRepo = new GenericRepository<Course>();

export class CourseService {
    createCourse(userId: string, data: CreateCourseDTO): Course {
        const course: Course = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            image: data.image ?? undefined,
            creatorId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return courseRepo.create(course);
    }

    getCourses(): Course[] {
        return courseRepo.findAll();
    }

    getCourseById(id: string): Course {
        const course = courseRepo.findById(id);
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        return course;
    }

    updateCourse(userId: string, id: string, data: UpdateCourseDTO): Course {
        const course = courseRepo.findById(id);
        if (!course) throw new CustomError("Course not found", "COURSE", 404);
        if (course.creatorId !== userId) {
            throw new CustomError("Forbidden", "COURSE", 403);
        }

        const updateData: Partial<Course> = {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.image !== undefined && { image: data.image }),
            updatedAt: new Date(),
        };

        return courseRepo.update(id, updateData);
    }

    deleteCourse(userId: string, id: string): void {
        const course = courseRepo.findById(id);
        if (!course) throw new CustomError("Course not found", "COURSE", 404);

        if (course.creatorId !== userId) {
            throw new CustomError("Forbidden", "COURSE", 403);
        }

        courseRepo.delete(id);
    }
}

export const courseService = new CourseService();