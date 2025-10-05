import { Request, Response, NextFunction } from "express";
import { courseService } from "./course.service";
import { createCourseSchema, UpdateCourseDTO, updateCourseSchema } from "./course.dto";
import { CustomError } from "../shared/utils/exception";

export class CourseController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
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
            return res.status(200).json({success:true,data:course});

        } catch (error) {
            next(error);
        }
    }


    async update(req:Request,res:Response,next:NextFunction){
        try{
            const data =updateCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
             if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
            const role = (req as any).user.role as "ADMIN" | "COACH" | "STUDENT";
            const updated = await courseService.updateCourse(userId,req.params.id,data,role);

            return res.status(200).json({success:true,data:updated});
        }catch(error){
            next(error);
        }
    }

    async remove(req:Request,res:Response,next:NextFunction){
        try{
        const userId = (req as any).user.id;
         if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
        
        const role = (req as any).user.role as "ADMIN" | "COACH" | "STUDENT";
        await courseService.deleteCourse(userId,req.params.id,role);
        return res.status(200).json({success:true,message:"Course Deleted"});
        }catch(error){
            next(error);
        }
    }
}

export const courseController = new CourseController();