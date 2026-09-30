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
        room: {
            type: "string",
            maxLength: 50
        },
        status: {
            type: "string",
            maxLength: 20
        },
        created_at: {
            type: "string",
            format: "date-time"
        }
    }
};