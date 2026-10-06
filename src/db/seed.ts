import "dotenv/config";
import { db } from "../index";
import {
    roles,
    users,
    seats,
    meetingRooms,
} from "./schema";

async function seed() {
    console.log("🌱 Seeding database...");

    // Roles
    const insertedRoles = await db
        .insert(roles)
        .values([
            { roleName: "user" },
            { roleName: "admin" },
        ])
        .onConflictDoNothing()
        .returning();

    console.log(`Created ${insertedRoles.length} roles`);

    // Get roles in case they already existed
    const allRoles = await db.select().from(roles);

    const userRole = allRoles.find(
        (role) => role.roleName === "user"
    );

    const adminRole = allRoles.find(
        (role) => role.roleName === "admin"
    );

    if (!userRole || !adminRole) {
        throw new Error("Could not find user/admin roles");
    }

    // Users
    await db
        .insert(users)
        .values([
            {
                email: "user@funkyseats.no",
                roleId: userRole.id,
            },
            {
                email: "admin@funkyseats.no",
                roleId: adminRole.id,
            },
        ])
        .onConflictDoNothing();

    console.log("Created demo users");

    // Seats
    const seatData = Array.from({ length: 28 }, (_, index) => {
        const number = index + 1;

        return {
            name: `A${String(number).padStart(2, "0")}`,
            type:
                number <= 10
                    ? "Chromebox"
                    : number <= 20
                        ? "Windows"
                        : "Kun plass",
            bookingRestriction:
                number >= 25
                    ? "KAN KUN BOOKES ETTER AVTALE"
                    : null,
            status: "available",
        };
    });

    await db
        .insert(seats)
        .values(seatData)
        .onConflictDoNothing();

    console.log("Created 28 seats");

    // Meeting rooms
    const roomData = Array.from({ length: 10 }, (_, index) => {
        const number = index + 1;

        return {
            name: `Meeting Room ${String(number).padStart(2, "0")}`,
            capacity:
                number <= 4
                    ? 4
                    : number <= 8
                        ? 6
                        : 10,
            status: "available",
        };
    });

    await db
        .insert(meetingRooms)
        .values(roomData)
        .onConflictDoNothing();

    console.log("Created 10 meeting rooms");

    console.log("✅ Seeding complete!");
}

seed()
    .catch((error) => {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        process.exit(0);
    });