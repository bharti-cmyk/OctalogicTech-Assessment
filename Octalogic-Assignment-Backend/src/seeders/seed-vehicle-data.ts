export const seedVehicleData = async (queryInterface: any) => {
  await queryInterface.bulkInsert("vehicleTypes", [
    {
      name: "Hatchback",
      category: "car",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "SUV",
      category: "car",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Sedan",
      category: "car",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Cruiser",
      category: "bike",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const vehicleTypes: any[] = await queryInterface.sequelize.query(
    "SELECT * FROM vehicleTypes ORDER BY id ASC LIMIT 4;",
    { type: queryInterface.sequelize.QueryTypes.SELECT },
  );

  await queryInterface.bulkInsert("vehicles", [
    {
      name: "Swift",
      vehicleTypeId: vehicleTypes[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Creta",
      vehicleTypeId: vehicleTypes[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "City",
      vehicleTypeId: vehicleTypes[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Avenger",
      vehicleTypeId: vehicleTypes[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
