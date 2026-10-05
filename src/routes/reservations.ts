import {FastifyInstance} from "fastify";
import {errorResponseSchema, reservationSchema} from "../schemas/reservations";
import {
    createReservation,
    deleteReservation,
    getActiveReservations,
    getReservationById,
    getReservations, hasOverlappingReservation,
    updateReservation
} from "../db/operations/reservations";
import {
    CreateReservationBody,
    ReservationParams,
    toReservationData,
    toUpdateReservationData,
    UpdateReservationBody
} from "../types/reservations";
import {getSeatById} from "../db/operations/seats";
import {getRoomById} from "../db/operations/room";

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
    }, async () => {

        return await getReservations();
    });
    app.get("/reservations/active", {
        schema: {
            description: "Get active reservations",
            tags: ["Reservations"],
            response: {
                200: {
                    type: "array",
                    items: reservationSchema
                }
            }
        }
    }, async () => {
        return await getActiveReservations();
    });

    
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
                200: reservationSchema,
                404: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const {id} = request.params as ReservationParams;
        const reservation = await getReservationById(id);
        if (!reservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        return reservation;
    });
    app.post("/reservations", {
        schema: {
            description: "Create a reservation",
            tags: ["Reservations"],
            body: {
                type: "object",
                required: ["userId", "startTime", "endTime"],
                properties: {
                    userId: {
                        type: "integer"
                    },
                    seatId: {
                        type: ["integer", "null"]
                    },
                    meetingRoomId: {
                        type: ["integer", "null"]
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
                201: reservationSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                409: errorResponseSchema

            }
        }
    }, async (request, reply) => {
    const body = request.body as CreateReservationBody;

    
    if (
        (body.seatId === null || body.seatId === undefined) &&
        (body.meetingRoomId === null || body.meetingRoomId === undefined)
    ) {
        return reply.code(400).send({
            message: "Either seatId or meetingRoomId is required"
        });
    }

    if (
        body.seatId !== null &&
        body.seatId !== undefined &&
        body.meetingRoomId !== null &&
        body.meetingRoomId !== undefined
    ) {
        return reply.code(400).send({
            message: "Only one of seatId or meetingRoomId can be provided"
        });
    }

    
    if (body.seatId !== null && body.seatId !== undefined) {
        const seat = await getSeatById(body.seatId);

        if (!seat) {
            return reply.code(404).send({
                message: "Seat not found"
            });
        }

        if (seat.status === "deactivated") {
            return reply.code(409).send({
                message: "Seat is deactivated and cannot be reserved"
            });
        }
    }

    if (body.meetingRoomId !== null && body.meetingRoomId !== undefined) {
        const room = await getRoomById(body.meetingRoomId);

        if (!room) {
            return reply.code(404).send({
                message: "Meeting room not found"
            });
        }

        if (room.status === "deactivated") {
            return reply.code(409).send({
                message: "Meeting room is deactivated and cannot be reserved"
            });
        }
    }

    const reservationData = toReservationData(body);

    
    const overlapping = await hasOverlappingReservation(
        reservationData.seatId ?? null,
        reservationData.meetingRoomId ?? null,
        reservationData.startTime,
        reservationData.endTime
    );

    if (overlapping) {
        return reply.code(409).send({
            message: "Resource is already reserved during this time"
        });
    }

    const reservation = await createReservation(reservationData);

    return reply.code(201).send(reservation);
});
    app.patch("/reservations/:id", {
        schema: {
            description: "Update a reservation",
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
            body: {
                type: "object",
                required: ["userId", "startTime", "endTime"],
                properties: {
                    userId: {
                        type: "integer"
                    },
                    seatId: {
                        type: ["integer", "null"]
                    },
                    meetingRoomId: {
                        type: ["integer", "null"]
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
                200: reservationSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                409: errorResponseSchema
            }
        }
    }, async (request, reply) => {

        const {id} = request.params as ReservationParams;
        const body = request.body as UpdateReservationBody;

        
        const existingReservation = await getReservationById(id);

        if (!existingReservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        
        if (
            (body.seatId === null || body.seatId === undefined) &&
            (body.meetingRoomId === null || body.meetingRoomId === undefined)
        ) {
            return reply.code(400).send({
                message: "Either seatId or meetingRoomId is required"
            });
        }

        if (
            body.seatId !== null &&
            body.seatId !== undefined &&
            body.meetingRoomId !== null &&
            body.meetingRoomId !== undefined
        ) {
            return reply.code(400).send({
                message: "Only one of seatId or meetingRoomId can be provided"
            });
        }

        
        if (body.seatId !== null && body.seatId !== undefined) {
            const seat = await getSeatById(body.seatId);

            if (!seat) {
                return reply.code(404).send({
                    message: "Seat not found"
                });
            }

            if (seat.status === "deactivated") {
                return reply.code(409).send({
                    message: "Seat is deactivated and cannot be reserved"
                });
            }
        }

        
        if (
            body.meetingRoomId !== null &&
            body.meetingRoomId !== undefined
        ) {
            const room = await getRoomById(body.meetingRoomId);

            if (!room) {
                return reply.code(404).send({
                    message: "Meeting room not found"
                });
            }

            if (room.status === "deactivated") {
                return reply.code(409).send({
                    message: "Meeting room is deactivated and cannot be reserved"
                });
            }
        }

        const reservationData = toUpdateReservationData(body);

        
        
        const overlapping = await hasOverlappingReservation(
            reservationData.seatId ?? null,
            reservationData.meetingRoomId ?? null,
            reservationData.startTime,
            reservationData.endTime,
            Number(id)
        );

        if (overlapping) {
            return reply.code(409).send({
                message: "Resource is already reserved during this time"
            });
        }

        const reservation = await updateReservation(
            id,
            reservationData
        );

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
        const {id} = request.params as ReservationParams;
        const reservation = await deleteReservation(id);
        if (!reservation) {
            return reply.code(404).send({
                message: "Reservation not found"
            });
        }

        return reply.code(204).send();
    });
}