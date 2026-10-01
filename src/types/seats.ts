export type SeatParams = {
    seatid: number;
};

export type CreateSeatBody = {
    name: string;
    type?: string;
    bookingRestriction?: string;
};

export type UpdateSeatBody = {
    name?: string;
    type?: string;
    bookingRestriction?: string;
};