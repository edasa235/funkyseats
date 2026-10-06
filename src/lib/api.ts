const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getSeats() {
    const response = await fetch(`${API_URL}/seats`);

    if (!response.ok) {
        throw new Error("Failed to fetch seats");
    }

    return response.json();
}

export async function getRooms() {
    const response = await fetch(`${API_URL}/rooms`);

    if (!response.ok) {
        throw new Error("Failed to fetch rooms");
    }

    return response.json();
}
export async function createReservation(data: {
    userId: number;
    seatId?: number;
    meetingRoomId?: number;
    startTime: string;
    endTime: string;
}) {
    const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Failed to create reservation"
        );
    }

    return result;
}export async function checkSeatAvailability(
    id: number,
    startTime: string,
    endTime: string
) {
    const response = await fetch(
        `${API_URL}/seats/${id}/available?startTime=${encodeURIComponent(
            startTime
        )}&endTime=${encodeURIComponent(endTime)}`
    );

    if (!response.ok) {
        throw new Error("Failed to check seat availability");
    }

    return response.json();
}

export async function checkRoomAvailability(
    id: number,
    startTime: string,
    endTime: string
) {
    const response = await fetch(
        `${API_URL}/rooms/${id}/available?startTime=${encodeURIComponent(
            startTime
        )}&endTime=${encodeURIComponent(endTime)}`
    );

    if (!response.ok) {
        throw new Error("Failed to check room availability");
    }

    return response.json();
}