interface BookingSuccessResponse {
    id: number;
    vehicleId: number;
    userName: string;
    from: string;
    to: string;
    createdAt: string;
    updatedAt: string;
}

interface ErrorResponse {
    message: string;
}

type BookingResponse = BookingSuccessResponse | { message: string };
