import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error occurred:", err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const errorMessage =
    err instanceof AppError ? err.message : "Something went wrong";

  res.status(statusCode).json({
    success: false,
    statusCode,
    data: null, // Null because it's an error response
    error: {
      message: errorMessage, // Error message here
    },
  });
};
