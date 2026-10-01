import {db} from "../../index";
import {reservations} from "../schema";
import {eq} from "drizzle-orm";

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
export async function createReservation(
    seatId: number,
    userId: number,
    startTime: Date,
    endTime: Date
) {
    const result = await db
        .insert(reservations)
        .values({
            seatId,
            userId,
            startTime,
            endTime
        })
        .returning();

    return result[0];
}
export async function updateReservation(
    id: number,
    seatId: number,
    userId: number,
    startTime: Date,
    endTime: Date
) {
    const result = await db
        .update(reservations)
        .set({
            seatId,
            userId,
            startTime,
            endTime
        })
        .where(eq(reservations.id, id))
        .returning();

    return result[0];
}
export async function deleteReservation(
    id: number,
) {
    const result = await db
    .delete(reservations)
    .where(eq(reservations.id, id));
    return result[0];
}