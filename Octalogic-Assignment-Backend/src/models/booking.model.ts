import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Vehicle } from "./vehicle.model";

export class Booking extends Model {}

Booking.init(
  {
    userName: { type: DataTypes.STRING, allowNull: false },
    from: { type: DataTypes.DATE, allowNull: false },
    to: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: "booking" },
);

Booking.belongsTo(Vehicle);
Vehicle.hasMany(Booking);
