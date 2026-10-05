import {and, eq, gt, lt, ne} from "drizzle-orm";
import { reservations } from "../schema";
import { db } from "../../index";

export async function getReservations() {
    return await db
        .select()
        .from(reservations);
}

export async function getReservationById(id: number) {
    const result = await db
        .select()
        .from(reservations)
        .where(eq(reservations.id, id));

    return result[0];
}
export async function hasOverlappingReservation(
    seatId: number | null,
    meetingRoomId: number | null,
    startTime: Date,
    endTime: Date,
    excludeReservationId?: number
) {
    const conditions = [
        lt(reservations.startTime, endTime),
        gt(reservations.endTime, startTime),
    ];

    if (seatId !== null) {
        conditions.push(eq(reservations.seatId, seatId));
    }

    if (meetingRoomId !== null) {
        conditions.push(eq(reservations.meetingRoomId, meetingRoomId));
    }

    if (excludeReservationId !== undefined) {
        conditions.push(ne(reservations.id, excludeReservationId));
    }

    const existing = await db
        .select()
        .from(reservations)
        .where(and(...conditions))
        .limit(1);

    return existing.length > 0;
}
export async function createReservation(data: {
    userId: number;
    seatId?: number | null;
    meetingRoomId?: number | null;
    startTime: Date;
    endTime: Date;
}) {
    const result = await db
        .insert(reservations)
        .values(data)
        .returning();

    return result[0];
}

export async function updateReservation(
    id: number,
    data: {
        userId?: number;
        seatId?: number | null;
        meetingRoomId?: number | null;
        startTime?: Date;
        endTime?: Date;
    }
) {
    const result = await db
        .update(reservations)
        .set(data)
        .where(eq(reservations.id, id))
        .returning();

    return result[0];
}

export async function deleteReservation(id: number) {
    const result = await db
        .delete(reservations)
        .where(eq(reservations.id, id))
        .returning();

    return result[0];
}
export async function getActiveReservations() {
    const now = new Date();

    return await db
        .select()
        .from(reservations)
        .where(
            and(
                lt(reservations.startTime, now),
                gt(reservations.endTime, now)
            )
        );
}
