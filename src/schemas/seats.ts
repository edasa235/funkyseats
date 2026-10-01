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
        type: {
            type: "string",
            maxLength: 50,
            nullable: true
        },
        bookingRestriction: {
            type: "string",
            maxLength: 100,
            nullable: true
        },
        createdAt: {
            type: "string",
            format: "date-time"
        }
    }
};