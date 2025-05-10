// vehicle.controller.ts
import { Request } from "express";
import { VehicleType } from "../models/vehicleType.model";
import { Vehicle } from "../models/vehicle.model";
import { AppError } from "../utils/AppError";
import { VehicleCategory, WheelType } from "../constant/enums";

export const getAllVehicleTypes = async (req: Request) => {
  const wheels = req.query.wheels;

  if (!wheels || typeof wheels !== "string") {
    throw new AppError("Wheels type is required and must be a string", 400);
  }

  let category: VehicleCategory;

  switch (wheels) {
    case WheelType.Two:
      category = VehicleCategory.Bike;
      break;
    case WheelType.Four:
      category = VehicleCategory.Car;
      break;
    default:
      throw new AppError("Invalid wheels value", 400);
  }

  const types = await VehicleType.findAll({
    where: { category },
    include: Vehicle,
  });

  return types;
};
