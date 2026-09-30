import { FastifyInstance } from "fastify";
import { reservationSchema } from "../schemas/reservations";

export async function reservationsRoutes(app: FastifyInstance) {

    // GET /reservations
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
    }, async () => {
        return [];
    });


    // GET /reservations/:id
    app.get("/reservations/:id", {
        schema: {
            description: "Get reservation by ID",
            tags: ["Reservations"],
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    }
                },
                required: ["id"]
            },
            response: {
                200: reservationSchema
            }
        }
    }, async (request) => {

        const { id } = request.params as { id: string };

        return {
            id: Number(id)
        };
    });


    // POST /reservations
    app.post("/reservations", {
        schema: {
            description: "Create a reservation",
            tags: ["Reservations"],
            body: {
                type: "object",
                required: [
                    "seatId",
                    "userId",
                    "startTime",
                    "endTime"
                ],
                properties: {
                    seatId: {
                        type: "integer"
                    },
                    userId: {
                        type: "integer"
                    },
                    startTime: {
                        type: "string",
                        format: "date-time"
                    },
                    endTime: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },
            response: {
                201: reservationSchema
            }
        }
    }, async (request, reply) => {

        const body = request.body as {
            seatId: number;
            userId: number;
            startTime: string;
            endTime: string;
        };

        return reply.code(201).send({
            seatId: body.seatId,
            userId: body.userId,
            startTime: body.startTime,
            endTime: body.endTime
        });
    });


    // DELETE /reservations/:id
    app.delete("/reservations/:id", {
        schema: {
            description: "Delete a reservation",
            tags: ["Reservations"],
            params: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    }
                },
                required: ["id"]
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: string };

        console.log(`Deleting reservation ${id}`);

        return reply.code(204).send();
    });
}