import { Request, Response, NextFunction } from "express";
import { courseService } from "./course.service";
import { createCourseSchema, UpdateCourseDTO, updateCourseSchema } from "./course.dto";
import { success } from "zod";
import { CustomError } from "../shared/utils/exception";

export class CourseController {
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
            const course = courseService.createCourse(userId, data);
            return res.status(200).json({ success: true, data: course });

        } catch (error) {
            next(error);
        }
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = courseService.getCourses();
            return res.status(200).json({ success: true, data: courses })
        } catch (error) {
            next(error);
        }
    }

    getById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
            const course = courseService.getCourseById(req.params.id);
            return res.status(200).json({success:true,data:course});

        } catch (error) {
            next(error);
        }
    }


    update(req:Request,res:Response,next:NextFunction){
        try{
            const data =updateCourseSchema.parse(req.body);
            const userId = (req as any).user.id;
             if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
            const updated = courseService.updateCourse(userId,req.params.id,data);

            return res.status(200).json({success:true,data:updated});
        }catch(error){
            next(error);
        }
    }

    remove(req:Request,res:Response,next:NextFunction){
        try{
        const userId = (req as any).user.id;
         if (!req.params.id) {
                throw new CustomError("Course ID is required", "COURSE", 400);
            }
        courseService.deleteCourse(userId,req.params.id);
        return res.status(200).json({success:true,message:"Course Deleted"});
        }catch(error){
            next(error);
        }
    }
}

export const courseController = new CourseController();