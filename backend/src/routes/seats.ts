import { FastifyInstance } from "fastify";

export async function seatsRoutes(app: FastifyInstance) {
    app.get("/seats", {
        schema: {
            description: "Get all seats",
            tags: ["Seats"],

            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer"
                            },
                            name: {
                                type: "string"
                            },
                            status: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        }
    }, async () => {
        return [
            {
                id: 1,
                name: "A1",
                status: "available"
            },
            {
                id: 2,
                name: "A2",
                status: "reserved"
            }
        ];
    });
}