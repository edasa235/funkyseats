export const userSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        email: {
            type: "string",
            format: "email",
            maxLength: 255
        },
        roleId: {
            type: "integer"
        },
        createdAt: {
            type: "string",
            format: "date-time"
        }
    }
};