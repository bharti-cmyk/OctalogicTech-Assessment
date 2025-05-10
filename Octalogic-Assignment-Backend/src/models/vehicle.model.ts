import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { VehicleType } from "./vehicleType.model";
export class Vehicle extends Model {}

Vehicle.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "vehicle" },
);

Vehicle.belongsTo(VehicleType);
VehicleType.hasMany(Vehicle);
