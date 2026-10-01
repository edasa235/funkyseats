import { FastifyInstance } from "fastify";
import { seatSchema } from "../schemas/seats";
import {createSeat, deleteSeat, getAllSeats, getSeatById, updateSeat} from "../db/operations/seats";

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

        return await getAllSeats();
    });

    app.get("/seats/:seatid", {
        schema: {
            description: "Get a seat by ID",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "number" },
                },
                required: ["seatid"]
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as { seatid: string };
        const seat = await getSeatById(Number(seatid));
        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }
        return seat;
    });
    app.post("/seats", {
        schema: {
            description: "Create a new seat",
            tags: ["Seats"],
            body: {
                type: "object",
                required: ["name", "roomId"],
                properties: {
                    name: { type: "string" },
                    roomId: { type: "integer" }
                }
            },
            response: {
                201: seatSchema
            }
        }
    }, async (request, reply) => {

        const body = request.body as {
            name: string;
            roomId: number;
        };

        const seat = await createSeat(
            body.name,
            body.roomId
        );

        return reply.code(201).send(seat);
    });


    app.patch("/seats/:seatid", {
        schema: {
            description: "Update a seat",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "string" }
                },
                required: ["seatid"]
            },
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    roomId: { type: "integer" }
                }
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as { seatid: string };

        const body = request.body as {
            name?: string;
            roomId?: number;
        };

        const seat = await updateSeat(
            Number(seatid),
            body
        );

        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        return seat;
    });


    app.delete("/seats/:seatid", {
        schema: {
            description: "Delete a seat",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "string" }
                },
                required: ["seatid"]
            },
            response: {
                204: {
                    type: "null"
                }
            }
        }
    }, async (request, reply) => {

        const { seatid } = request.params as { seatid: string };

        const seat = await deleteSeat(Number(seatid));

        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        return reply.code(204).send();
    });
}