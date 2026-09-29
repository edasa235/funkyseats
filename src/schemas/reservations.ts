export const reservationSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        seat_id: {
            type: "integer"
        },
        user_email: {
            type: "string",
            format: "email",
            maxLength: 255
        },
        reservation_date: {
            type: "string",
            format: "date"
        },
        start_time: {
            type: "string"
        },
        end_time: {
            type: "string"
        },
        created_at: {
            type: "string",
            format: "date-time"
        }
    }
};