import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/exception"; // عدل المسار حسب مكان ملفك
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

   if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.flatten(),
    });
  }


  if (err instanceof CustomError) {
    console.log("CustomError:", err);
    const code = (err as any).statusCode ?? (err as any).StatusCode ?? 400;
    return res.status(code).json({
      success: false,
      message: err.message,
      module: (err as any).moduleName,
      statusCode: code,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(400).json({ success: false, message: "Unique constraint failed" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }
  }
  
  console.error("Unexpected error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
