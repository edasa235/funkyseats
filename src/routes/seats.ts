import { FastifyInstance } from "fastify";
import { seatSchema } from "../schemas/seats";
import {
    checkSeatAvailability,
    createSeat,
    deleteSeat,
    getAllSeats,
    getSeatById, getSeatReservations,
    updateSeat
} from "../db/operations/seats";
import {CreateSeatBody, SeatParams, UpdateSeatBody} from "../types/seats";

export async function seatsRoutes(app: FastifyInstance) {

    // GET /seats
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
    }, async () => {
        return await getAllSeats();
    });

    // GET /seats/:seatid
    app.get("/seats/:seatid", {
        schema: {
            description: "Get a seat by ID",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "integer" }
                },
                required: ["seatid"]
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as SeatParams;

        const seat = await getSeatById(seatid);


        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        return seat;
    });

    // POST /seats
    app.post("/seats", {
        schema: {
            description: "Create a new seat",
            tags: ["Seats"],
            body: {
                type: "object",
                required: ["name"],
                properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    bookingRestriction: { type: "string" }
                }
            },
            response: {
                201: seatSchema
            }
        }
    }, async (request, reply) => {

        const body = request.body as CreateSeatBody;

        const seat = await createSeat(
            body.name,
            body.type,
            body.bookingRestriction
        );

        return reply.code(201).send(seat);
    });

    // PATCH /seats/:seatid
    app.patch("/seats/:seatid", {
        schema: {
            description: "Update a seat",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "integer" }
                },
                required: ["seatid"]
            },
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    bookingRestriction: { type: "string" }
                }
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as SeatParams;
        const body = request.body as UpdateSeatBody;

        const seat = await updateSeat(seatid, body);
        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        return seat;
    });

    // DELETE /seats/:seatid
    app.delete("/seats/:seatid", {
        schema: {
            description: "Delete a seat",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "integer" }
                },
                required: ["seatid"]
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as SeatParams;

        const seat = await deleteSeat(seatid);
        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        return reply.code(204).send();
    });
    app.get("/seats/:id/reservations", async (request) => {

        const { id } = request.params as {
            id: number;
        };

        return await getSeatReservations(id);
    });
    app.get("/seats/:seatid/available", {
        schema: {
            description: "Check if a seat is available",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "integer" }
                },
                required: ["seatid"]
            },
            querystring: {
                type: "object",
                properties: {
                    startTime: { type: "string", format: "date-time" },
                    endTime: { type: "string", format: "date-time" }
                },
                required: ["startTime", "endTime"]
            }
        }
    }, async (request, reply) => {
        const { seatid } = request.params as { seatid: number };
        const { startTime, endTime } = request.query as {
            startTime: string;
            endTime: string;
        };

        const available = await checkSeatAvailability(
            seatid,
            new Date(startTime),
            new Date(endTime)
        );

        return {
            seatId: seatid,
            available
        };
    });
}
