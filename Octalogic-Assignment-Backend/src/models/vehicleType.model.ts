import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class VehicleType extends Model {}

VehicleType.init({
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.ENUM('car', 'bike'), allowNull: false }
}, { sequelize, modelName: 'vehicleType' });
