import jwt from "jsonwebtoken";
import { CustomError } from "./exception";
import { JwtPayload } from "../middlewares/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const generatToken =(payload:object):string=>{
    try{
return jwt.sign(payload,JWT_SECRET,{expiresIn: "1h"});
    }
    catch(error){
        throw new CustomError("Failed to generate token","AUTH",500);
    }
};

export const verifyToken = (token: string): JwtPayload => {
    try{
        return jwt.verify(token,JWT_SECRET) as JwtPayload;
    }
    catch(error){
        throw new CustomError("Invalid or expired token","AUTH",401);
    }

};