import sequelize from "../config/database";
import { seedVehicleData } from "../seeders/seed-vehicle-data";

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection success");

    const queryInterface = sequelize.getQueryInterface();
    await seedVehicleData(queryInterface);

    console.log("Seeding successful!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await sequelize.close();
  }
};

run();
