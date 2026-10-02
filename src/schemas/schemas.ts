export const roleSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        roleName: {
            type: "string",
            maxLength: 50
        }
    }
};