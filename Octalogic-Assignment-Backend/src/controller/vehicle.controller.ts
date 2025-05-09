import { Request, Response } from 'express';
import { VehicleType } from '../models/vehicleType.model';
import { Vehicle } from '../models/vehicle.model';

export const getAllVehicleTypes = async (req: Request, res: Response) => {
  try {
    const { wheels } = req.query

    const types = await VehicleType.findAll({
      where: wheels
        ? {
            category: wheels === '2' ? 'bike' : 'car',
          }
        : undefined,
      include: Vehicle,
    })

    res.status(200).json(types)
  } catch (err) {
    console.error('Error fetching vehicle types:', err)
    res.status(500).json({ message: 'Server error' })
  }
}