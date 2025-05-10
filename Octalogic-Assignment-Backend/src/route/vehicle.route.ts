import express, { Request, Response, NextFunction } from "express";
import { getAllVehicleTypes } from "../controller/vehicle.controller";
import { controllerHandler } from "../utils/controllerHandler";

const router = express.Router();
router.get("/vehicle-types", controllerHandler(getAllVehicleTypes));
export default router;
