import { Request, Response, NextFunction } from "express";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json;

  res.json = function (data) {
    // If data exists, format the response with success = true
    const responseBody = {
      success: true,
      data: data ?? null, // Simply return the data or null if no data
      error: null, // No error in success case
    };

    // Call the original `json` function to send the response
    return originalJson.call(this, responseBody);
  };

  next(); // Proceed to the next middleware
};
