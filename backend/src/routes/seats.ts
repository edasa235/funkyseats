import { FastifyInstance } from "fastify";
import { seatSchema } from "../schemas/seats";

export async function seatsRoutes(app: FastifyInstance) {

    app.get("/seats", {
        schema: {
            description: "Get all seats",
            tags: ["Seats"],
            response: {
                200: {
                    type: "array",
                    items: seatSchema
                }
            }
        }
    }, async (request, reply) => {

        return [];
    });

}