import { FastifyInstance } from "fastify";
import { reservationSchema } from "../schemas/reservations";
import {
    createReservation,
    deleteReservation,
    getReservationById,
    getReservations,
    updateReservation
} from "../db/operations/reservations";

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
    },async () => {

        return await getReservations();
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
    },  async (request, reply) => {

        const { id } = request.params as { id: string };

        const reservation = await getReservationById(Number(id));

        if (!reservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        return reservation;
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
    },async (request, reply) => {

        const body = request.body as {
            seatId: number;
            userId: number;
            startTime: string;
            endTime: string;
        };

        const reservation = await createReservation(
            body.seatId,
            body.userId,
            new Date(body.startTime),
            new Date(body.endTime)
        );

        return reply.code(201).send(reservation);
    });

    app.patch("/reservations/:id", {
        schema: {
            description: "Update a reservation",
            tags: ["Reservations"],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            body: {
                type: "object",
                required: [
                    "seatId",
                    "userId",
                    "startTime",
                    "endTime"
                ],
                properties: {
                    seatId: { type: "integer" },
                    userId: { type: "integer" },
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
                200: reservationSchema
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: string };

        const body = request.body as {
            seatId: number;
            userId: number;
            startTime: string;
            endTime: string;
        };

        const reservation = await updateReservation(
            Number(id),
            body.seatId,
            body.userId,
            new Date(body.startTime),
            new Date(body.endTime)
        );

        if (!reservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        return reservation;
    });
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

        const reservation = await deleteReservation(Number(id));

        if (!reservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        return reply.code(204).send();
    });
}