import express from 'express';
import { getAllVehicleTypes } from '../controller/vehicle.controller';

const router = express.Router();
router.get('/vehicle-types', getAllVehicleTypes);
export default router;
