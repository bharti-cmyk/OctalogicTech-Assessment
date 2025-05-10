import express from "express";
import cors from "cors";
import vehicleRoutes from "./route/vehicle.route";
import bookingRoutes from "./route/booking.route";
import { responseHandler } from "./middlewares/responseHandler";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", vehicleRoutes);
app.use("/api", bookingRoutes);

app.use(responseHandler);
app.use(errorHandler);
export default app;
