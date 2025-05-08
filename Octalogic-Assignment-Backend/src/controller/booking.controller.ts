import { Request, RequestHandler, Response } from 'express';
import { Booking } from '../models/booking.model';
import { Op } from 'sequelize';

export const createBooking: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { vehicleId, userName, from, to } = req.body;

    if (!vehicleId || !userName || !from || !to) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const conflict = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          { from: { [Op.between]: [from, to] } },
          { to: { [Op.between]: [from, to] } },
          {
            [Op.and]: [
              { from: { [Op.lte]: from } },
              { to: { [Op.gte]: to } }
            ]
          }
        ]
      }
    });

    if (conflict) {
      res.status(400).json({ message: 'Booking conflict exists.' });
      return;
    }

    const booking = await Booking.create({ vehicleId, userName, from, to });
    res.status(201).json(booking.toJSON());
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

