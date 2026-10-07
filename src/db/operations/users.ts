import {db} from "../../index";
import {reservations, roles, users} from "../schema";
import {eq} from "drizzle-orm";

export async function getUserReservations(userId: number) {
    return await db
        .select()
        .from(reservations)
        .where(eq(reservations.userId, userId));
}
export async function getUserWithRole(userId: number) {
    const result = await db
        .select({
            id: users.id,
            email: users.email,
            roleId: users.roleId,
            roleName: roles.roleName,
        })
        .from(users)
        .innerJoin(
            roles,
            eq(users.roleId, roles.id)
        )
        .where(eq(users.id, userId));

    return result[0];
}