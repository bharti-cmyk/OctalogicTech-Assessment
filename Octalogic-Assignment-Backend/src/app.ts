import express from 'express';
import vehicleRoutes from './route/vehicle.route';
import bookingRoutes from './route/booking.route'

const app = express();
app.use(express.json());
app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);
export default app;
