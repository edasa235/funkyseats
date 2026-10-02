import { FastifyInstance } from "fastify";
import {meetingRoomSchema} from "../schemas/room";
import {
    createRoom,
    deleteRoom,
    getAvailableMeetingRooms, getMeetingRoomReservations,
    getrooms,
    getroomsByID,
    updateRoom
} from "../db/operations/room";


export async function meetingRoomsRoutes(app: FastifyInstance) {

    // GET /rooms
    app.get("/rooms", {
        schema: {
            description: "Get all meeting rooms",
            tags: ["Meeting Rooms"],
            response: {
                200: {
                    type: "array",
                    items: meetingRoomSchema
                }
            }
        }
    }, async () => {
        return await getrooms();
    });


    // GET /rooms/:id
    app.get("/rooms/:id", {
        schema: {
            description: "Get meeting room by ID",
            tags: ["Meeting Rooms"],

            params: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    }
                },
                required: ["id"]
            },

            response: {
                200: meetingRoomSchema
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: number };

        const room = await getroomsByID(id);

        if (!room) {
            return reply.code(404).send({
                message: "Meeting room not found"
            });
        }

        return room;
    });


    // POST /rooms
    app.post("/rooms", {
        schema: {
            description: "Create meeting room",
            tags: ["Meeting Rooms"],

            body: {
                type: "object",
                required: ["name"],

                properties: {
                    name: {
                        type: "string"
                    },

                    capacity: {
                        type: "integer"
                    }
                }
            },

            response: {
                201: meetingRoomSchema
            }
        }
    }, async (request, reply) => {

        const body = request.body as {
            name: string;
            capacity?: number;
        };

        const room = await createRoom(body);

        return reply.code(201).send(room);
    });


    // PATCH /rooms/:id
    app.patch("/rooms/:id", {
        schema: {
            description: "Update meeting room",
            tags: ["Meeting Rooms"],

            params: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    }
                },
                required: ["id"]
            },

            body: {
                type: "object",

                properties: {
                    name: {
                        type: "string"
                    },

                    capacity: {
                        type: "integer"
                    }
                }
            },

            response: {
                200: meetingRoomSchema
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: number };

        const body = request.body as {
            name?: string;
            capacity?: number;
        };

        const room = await updateRoom(id, body);

        if (!room) {
            return reply.code(404).send({
                message: "Meeting room not found"
            });
        }

        return room;
    });


    // DELETE /rooms/:id
    app.delete("/rooms/:id", {
        schema: {
            description: "Delete meeting room",
            tags: ["Meeting Rooms"],

            params: {
                type: "object",
                properties: {
                    id: {
                        type: "integer"
                    }
                },
                required: ["id"]
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: number };

        const room = await deleteRoom(id);

        if (!room) {
            return reply.code(404).send({
                message: "Meeting room not found"
            });
        }

        return reply.code(204).send();
    });


    // GET /rooms/available
    app.get("/rooms/available", {
        schema: {
            description: "Get available meeting rooms",
            tags: ["Meeting Rooms"],

            querystring: {
                type: "object",

                required: [
                    "startTime",
                    "endTime"
                ],

                properties: {
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
                200: {
                    type: "array",
                    items: meetingRoomSchema
                }
            }
        }
    }, async (request) => {

        const { startTime, endTime } = request.query as {
            startTime: string;
            endTime: string;
        };

        return await getAvailableMeetingRooms(
            new Date(startTime),
            new Date(endTime)
        );
    });


    // GET /rooms/:id/reservations
    app.get("/rooms/:id/reservations", {
        schema: {
            description: "Get reservations for a meeting room",
            tags: ["Meeting Rooms"]
        }
    }, async (request) => {

        const { id } = request.params as {
            id: number;
        };

        return await getMeetingRoomReservations(id);
    });
}