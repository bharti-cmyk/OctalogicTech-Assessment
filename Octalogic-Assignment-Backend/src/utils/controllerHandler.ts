// utils/controllerHandler.ts
import { Request, Response, NextFunction } from "express";

export const controllerHandler = (
  controller: (req: Request) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller(req);
      res.json(data); // intercepted by responseHandler
    } catch (err) {
      next(err);
    }
  };
};
