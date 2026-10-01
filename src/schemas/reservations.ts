export const reservationSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        userId: {
            type: "integer"
        },
        seatId: {
            type: "integer",
            nullable: true
        },
        meetingRoomId: {
            type: "integer",
            nullable: true
        },
        startTime: {
            type: "string",
            format: "date-time"
        },
        endTime: {
            type: "string",
            format: "date-time"
        },
        createdAt: {
            type: "string",
            format: "date-time"
        }
    }
};