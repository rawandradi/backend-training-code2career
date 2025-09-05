import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/exception"; // عدل المسار حسب مكان ملفك

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log("CustomError:", err);

    return res.status(err.StatusCode).json({
      success: false,
      message: err.message,
      module: err.moduleName,
      statusCode: err.StatusCode,
    });
  }

  console.error("Unexpected error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
