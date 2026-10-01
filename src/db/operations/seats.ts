import { eq } from "drizzle-orm";
import { seats } from "../schema";
import { db } from "../../index";

export async function getAllSeats() {
    return await db
        .select()
        .from(seats);
}

export async function getSeatById(id: number) {
    const result = await db
        .select()
        .from(seats)
        .where(eq(seats.id, id));

    return result[0];
}

export async function createSeat(
    name: string,
    type?: string,
    bookingRestriction?: string
) {
    const result = await db
        .insert(seats)
        .values({
            name,
            type,
            bookingRestriction
        })
        .returning();

    return result[0];
}

export async function updateSeat(
    id: number,
    data: {
        name?: string;
        type?: string;
        bookingRestriction?: string;
    }
) {
    const result = await db
        .update(seats)
        .set(data)
        .where(eq(seats.id, id))
        .returning();

    return result[0];
}

export async function deleteSeat(id: number) {
    const result = await db
        .delete(seats)
        .where(eq(seats.id, id))
        .returning();

    return result[0];
}