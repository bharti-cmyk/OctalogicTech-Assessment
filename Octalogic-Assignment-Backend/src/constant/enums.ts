export enum VehicleCategory {
  Bike = "bike",
  Car = "car",
}

export enum WheelType {
  Two = "2",
  Four = "4",
}

export interface CreateBookingBody {
  vehicleId: number;
  userName: string;
  from: Date;
  to: Date;
}
