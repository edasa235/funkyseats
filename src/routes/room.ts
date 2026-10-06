import { FastifyInstance } from "fastify";
import {meetingRoomSchema} from "../schemas/room";
import {
    createRoom,
    deleteRoom,
    getAvailableMeetingRooms, getMeetingRoomReservations,
    getrooms,
    getRoomById,
    updateRoom, checkRoomAvailability
} from "../db/operations/room";
import {errorResponseSchema} from "../schemas/reservations";


export async function meetingRoomsRoutes(app: FastifyInstance) {

    
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
                200: meetingRoomSchema,
                404: errorResponseSchema
            }
        }
    }, async (request, reply) => {

        const { id } = request.params as { id: number };

        const room = await getRoomById(id);

        if (!room) {
            return reply.code(404).send({
                message: "Meeting room not found"
            });
        }

        return room;
    });


    
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
                200: meetingRoomSchema,
                404: errorResponseSchema
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



    app.get("/rooms/:id/available", {
        schema: {
            description: "Check if a meeting room is available",
            tags: ["Meeting Rooms"],
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                },
                required: ["id"]
            },
            querystring: {
                type: "object",
                properties: {
                    startTime: {
                        type: "string",
                        format: "date-time"
                    },
                    endTime: {
                        type: "string",
                        format: "date-time"
                    }
                },
                required: ["startTime", "endTime"]
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: number };

        const { startTime, endTime } = request.query as {
            startTime: string;
            endTime: string;
        };

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (start >= end) {
            return reply.code(400).send({
                message: "startTime must be before endTime"
            });
        }

        const available = await checkRoomAvailability(
            id,
            start,
            end
        );

        return {
            meetingRoomId: id,
            available
        };
    });
    
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