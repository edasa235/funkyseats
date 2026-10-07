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
    status?: "available" | "deactivated";
};
export type Seat = {
    id: number;
    name: string;
    type: string | null;
    bookingRestriction: string | null;
    status: string;
    createdAt: string;
};
export type MeetingRoom = {
    id: number;
    name: string;
    capacity: number | null;
    status: string;
    createdAt: string;
};