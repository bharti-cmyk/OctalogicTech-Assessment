import { Request } from "express";
import { Booking } from "../models/booking.model";
import { Op } from "sequelize";
import { AppError } from "../utils/AppError";
import { CreateBookingBody } from "../constant/enums";

export const createBooking = async (req: Request) => {
  const { vehicleId, userName, from, to }: CreateBookingBody = req.body;

  if (!vehicleId || !userName || !from || !to) {
    throw new AppError("All fields are required.", 400);
  }

  const overlap = await Booking.findOne({
    where: {
      vehicleId,
      [Op.or]: [
        { from: { [Op.between]: [from, to] } },
        { to: { [Op.between]: [from, to] } },
        {
          [Op.and]: [{ from: { [Op.lte]: from } }, { to: { [Op.gte]: to } }],
        },
      ],
    },
  });

  if (overlap) {
    throw new AppError("Vehicle already booked for the selected dates.", 400);
  }

  const booking = await Booking.create({ vehicleId, userName, from, to });
  return booking.toJSON();
};
