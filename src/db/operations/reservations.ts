import { eq } from "drizzle-orm";
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

export async function createReservation(data: {
    userId: number;
    seatId?: number;
    meetingRoomId?: number;
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