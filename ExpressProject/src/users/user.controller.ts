import { Request, Response, NextFunction } from "express";
import { userService, UserService } from "./user.service";
import { updateProfileSchema, createCoachSchema } from "./user.dto";
import { success } from "zod";


export class UserController {
    getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const profile = userService.getProfile(userId);
            return res.status(200).json({ success: true, data: profile });
        } catch (error) {
            next(error);
        }
    }

    async updateMe(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const data = updateProfileSchema.parse(req.body);
            const updated = await userService.updateProfile(userId, data);
            return res.status(200).json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    }

   async  createCoach(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCoachSchema.parse(req.body);
      const coach = await userService.createCoach(data);
      return res.status(201).json({ success: true, data: coach });
    } catch (error) {
      next(error);
    }
  }


}

export const userController = new UserController();
