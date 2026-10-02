import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
    text,
    check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    roleName: varchar("role_name", { length: 50 }).notNull().unique(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    roleId: integer("role_id")
        .notNull()
        .references(() => roles.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const seats = pgTable("seats", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 50 }).notNull(),

    type: varchar("type", { length: 50 }),

    bookingRestriction: varchar("booking_restriction", { length: 100 }),
    status: varchar("status", { length: 20 })
        .notNull()
        .default("available"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const meetingRooms = pgTable("meeting_rooms", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),

    capacity: integer("capacity"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reservations = pgTable(
    "reservations",
    {
        id: serial("id").primaryKey(),

        userId: integer("user_id")
            .notNull()
            .references(() => users.id),

        seatId: integer("seat_id")
            .references(() => seats.id),

        meetingRoomId: integer("meeting_room_id")
            .references(() => meetingRooms.id),

        startTime: timestamp("start_time").notNull(),
        endTime: timestamp("end_time").notNull(),

        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        check(
            "reservation_resource_check",
            sql`(
                (${table.seatId} IS NOT NULL AND ${table.meetingRoomId} IS NULL)
                OR
                (${table.seatId} IS NULL AND ${table.meetingRoomId} IS NOT NULL)
            )`
        ),
    ]
);