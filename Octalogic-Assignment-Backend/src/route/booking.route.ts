import express from "express";
import { createBooking } from "../controller/booking.controller";
import { controllerHandler } from "../utils/controllerHandler";

const router = express.Router();

router.post("/bookings", controllerHandler(createBooking));

export default router;
