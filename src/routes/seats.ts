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

    app.get("/seats/:seatid", {
        schema: {
            description: "Get a seat by ID",
            tags: ["Seats"],
            params: {
                type: "object",
                properties: {
                    seatid: { type: "string" }
                },
                required: ["seatid"]
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        return {
        };
    });

    app.post("/seats", {
        schema: {
            description: "Create a new seat",
            tags: ["Seats"],
            body: {
                type: "object",
                required: ["name", "room"],
                properties: {
                    name: { type: "string" },
                    room: { type: "string" }
                }
            },
            response: {
                201: seatSchema
            }
        }
    }, async (request, reply) => {

        reply.code(201);

        return {
        };
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
                    room: { type: "string" },
                    status: { type: "string" }
                }
            },
            response: {
                200: seatSchema
            }
        }
    }, async (request, reply) => {

        return {
        };
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

        reply.code(204);
    });
}