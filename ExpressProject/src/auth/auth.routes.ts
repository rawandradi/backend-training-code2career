import express  from "express";
import { authController } from "./auth.controller";

const authRoutes = express.Router()

authRoutes.post("/register",(req,res,next)=>authController.register(req,res,next));
authRoutes.post("/login",(req,res,next)=>authController.login(req,res,next));

export default authRoutes;