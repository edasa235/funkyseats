export const reservationSchema = {
    type: "object",
    required: [
        "userId",
        "startTime",
        "endTime"
    ],
    properties: {
        id: {
            type: "integer"
        },
        userId: {
            type: "integer"
        },
        seatId: {
            type: ["integer", "null"]
        },
        meetingRoomId: {
            type: ["integer", "null"]
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