export type ReservationParams = {
    id: number;
};

export type CreateReservationBody = {
    userId: number;
    seatId?: number;
    meetingRoomId?: number;
    startTime: string;
    endTime: string;
};

export type UpdateReservationBody = {
    userId: number;
    seatId?: number | null;
    meetingRoomId?: number | null;
    startTime: string;
    endTime: string;
};

export function toReservationData(body: CreateReservationBody) {
    return {
        userId: body.userId,
        seatId: body.seatId ?? null,
        meetingRoomId: body.meetingRoomId ?? null,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime)
    };
}

export function toUpdateReservationData(body: UpdateReservationBody) {
    return {
        userId: body.userId,
        seatId: body.seatId ?? null,
        meetingRoomId: body.meetingRoomId ?? null,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime)
    };
}