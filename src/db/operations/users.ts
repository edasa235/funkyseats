import {db} from "../../index";
import {reservations} from "../schema";
import {eq} from "drizzle-orm";

export async function getUserReservations(userId: number) {
    return await db
        .select()
        .from(reservations)
        .where(eq(reservations.userId, userId));
}