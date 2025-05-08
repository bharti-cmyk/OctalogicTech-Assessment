import { Request, Response } from 'express';
import { VehicleType } from '../models/vehicleType.model';
import { Vehicle } from '../models/vehicle.model';

export const getAllVehicleTypes = async (req: Request, res: Response) => {
  const types = await VehicleType.findAll({ include: Vehicle });
  res.status(201).json(types);
};
