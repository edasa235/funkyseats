export const seatSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        name: {
            type: "string",
            maxLength: 50
        },
        roomId: {
            type: "integer"
        },
        createdAt: {
            type: "string",
            format: "date-time"
        }
    }
};