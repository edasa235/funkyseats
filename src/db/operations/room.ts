import {db} from "../../index";
import {meetingRooms, reservations} from "../schema";
import {and, eq, gt, lt} from "drizzle-orm";


export async function getrooms () {
    return await db
        .select()
        .from(meetingRooms)
}
export async function getroomsByID(id: number) {
    const rooms = await db
    .select()
    .from(meetingRooms)
        .where(eq(meetingRooms.id, id))
    return rooms[0];
}
export async function createRoom(data: {name: string, capacity: number }) {
    const room = await db
        .insert(meetingRooms)
        .values(data)
        .returning()

    return room[0];
}
export async function updateRoom(
    id: number,
    data: {
        name?: string;
        capacity?: number;
    }
) {
    const room = await db
        .update(meetingRooms)
        .set(data)
        .where(eq(meetingRooms.id, id))
        .returning();

    return room[0];
}

export async function deleteRoom(id: number) {
    const room = await db
        .delete(meetingRooms)
        .where(eq(meetingRooms.id, id))
        .returning();

    return room[0];
}
export async function checkRoomAvailability(
    meetingRoomId: number,
    startTime: Date,
    endTime: Date
) {
    const result = await db
        .select()
        .from(reservations)
        .where(
            and(
                eq(reservations.meetingRoomId, meetingRoomId),
                lt(reservations.startTime, endTime),
                gt(reservations.endTime, startTime)
            )
        );

    return result.length === 0;
}
export async function getMeetingRoomReservations(
    meetingRoomId: number
) {
    return await db
        .select()
        .from(reservations)
        .where(
            eq(reservations.meetingRoomId, meetingRoomId)
        );
}
export async function getAvailableMeetingRooms(
    startTime: Date,
    endTime: Date
) {
    const rooms = await db
        .select()
        .from(meetingRooms);

    const availableRooms = [];

    for (const room of rooms) {
        const available = await checkRoomAvailability(
            room.id,
            startTime,
            endTime
        );

        if (available) {
            availableRooms.push(room);
        }
    }

    return availableRooms;
}