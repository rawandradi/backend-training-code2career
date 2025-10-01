import { Request, Response, NextFunction } from "express";
import { courseService } from "./course.service";
import { createCourseSchema, UpdateCourseDTO, updateCourseSchema } from "./course.dto";
import { success } from "zod";
import { CustomError } from "../shared/utils/exception";

export class CourseController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
            const role = (req as any).user?.role;

            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
            if (role !== "ADMIN" && role !== "COACH") {
                return res.status(403).json({ success: false, message: "Only COACH or ADMIN can create courses" });
            }

            const course = await courseService.createCourse(userId, data);
            return res.status(200).json({ success: true, data: course });

        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await courseService.getCourses();
            return res.status(200).json({ success: true, data: courses })
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
            const course = await courseService.getCourseById(req.params.id);
            return res.status(200).json({ success: true, data: course });

        } catch (error) {
            next(error);
        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) throw new CustomError("Course ID is required", "COURSE", 400);
            const data = updateCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
            const role = (req as any).user?.role;
            
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

            if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
            const updated = await courseService.updateCourse(userId, role ,req.params.id, data);

            return res.status(200).json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const role = (req as any).user?.role;
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

            if (!req.params.id) {
             throw new CustomError("Course ID is required", "COURSE", 400);
            }
            await courseService.deleteCourse(userId,role ,req.params.id);
            return res.status(200).json({ success: true, message: "Course Deleted" });
        } catch (error) {
            next(error);
        }
    }
}

export const courseController = new CourseController();