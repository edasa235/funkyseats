import { FastifyInstance } from "fastify";
import { reservationSchema } from "../schemas/reservations";

export async function reservationsRoutes(app: FastifyInstance) {

    app.get("/reservations", {
        schema: {
            description: "Get all reservations",
            tags: ["Reservations"],
            response: {
                200: {
                    type: "array",
                    items: reservationSchema
                }
            }
        }
    }, async (request, reply) => {
        return [];
    });

}