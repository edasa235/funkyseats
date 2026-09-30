import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";

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

export const rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
});

export const seats = pgTable("seats", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    roomId: integer("room_id")
        .notNull()
        .references(() => rooms.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reservations = pgTable("reservations", {
    id: serial("id").primaryKey(),

    seatId: integer("seat_id")
        .notNull()
        .references(() => seats.id),

    userId: integer("user_id")
        .notNull()
        .references(() => users.id),

    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});