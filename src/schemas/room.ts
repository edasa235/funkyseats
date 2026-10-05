export const meetingRoomSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        name: {
            type: "string",
            maxLength: 100
        },
        capacity: {
            type: "integer",
            nullable: true
        },
        status: {
            type: "string",
            enum: ["available", "deactivated"]
        },
        createdAt: {
            type: "string",
            format: "date-time"
        }
    }
};