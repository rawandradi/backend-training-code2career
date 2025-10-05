import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { registerSchema,loginSchema } from "./auth.dto";


export class AuthController{
    async register(req:Request,res:Response,next:NextFunction){
        try{
            const data = registerSchema.parse(req.body);
            const user = await authService.register(data);
            return res.status(200).json({success:true,data:user});
        }
        catch(error){
            next(error);
        }
    }

    async login(req:Request,res:Response,next:NextFunction){
        try{
            const data = loginSchema.parse(req.body);
            const result = await authService.login(data);
            return res.status(200).json({success:true,data:result});
        }catch(error){
            next(error);
        }
    }
}

export const authController = new AuthController();