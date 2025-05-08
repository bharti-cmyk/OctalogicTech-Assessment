import express from 'express';
import { createBooking } from '../controller/booking.controller';

const router = express.Router();

router.post('/bookings', createBooking);

export default router;
