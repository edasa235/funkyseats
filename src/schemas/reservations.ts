export const reservationSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        seatId: {
            type: "integer"
        },
        userId: {
            type: "integer"
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