import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/exception";
import { RoleType } from "../utils/constants";
import { verifyToken } from "../utils/jwt";

// 1. Define type outside function
export type JwtPayload = {
  id: string;
  role: RoleType;
};

// 2. Middleware function
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("Unauthorized", "AUTH", 401);
    }

    const token = authHeader.split(" ")[1];
    
if (!token) {
  throw new CustomError("Unauthorized", "AUTH", 401);
}

    const decoded = verifyToken(token) as JwtPayload;
    if (!decoded) {
      throw new CustomError("Invalid Token", "AUTH", 401);
    }

    (req as any).user = decoded;

    // 🔹 Move to next middleware/controller
    next();
  } catch (error) {
    next(error); // handled by error middleware
  }
};

export const authorize = (roles: RoleType[]) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const user =(req as any).user as JwtPayload;
            if(!user || !roles.includes(user.role)){
                throw new CustomError("Forbidden","AUTH",403);
            }

            next();
        }
        catch(error){
next(error);
        }
    }
}
