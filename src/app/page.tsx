"use client";

import { useEffect, useState } from "react";
import {checkRoomAvailability, checkSeatAvailability, createReservation, getRooms, getSeats} from "../lib/api";
import {MeetingRoom, Seat} from "../types/seats";

export default function Home() {
  const [period, setPeriod] = useState("all");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seatAvailability, setSeatAvailability] =
      useState<Record<number, boolean>>({});

  const [roomAvailability, setRoomAvailability] =
      useState<Record<number, boolean>>({});
  const [reserveDate, setReserveDate] = useState(getToday());  const [view, setView] = useState<"seats" | "rooms">("seats");
  function getReservationTimes() {
    if (period === "before") {
      return {
        startTime: createDateTime(reserveDate, 8),
        endTime: createDateTime(reserveDate, 12),
      };
    }

    if (period === "after") {
      return {
        startTime: createDateTime(reserveDate, 12),
        endTime: createDateTime(reserveDate, 16),
      };
    }

    return {
      startTime: createDateTime(reserveDate, 8),
      endTime: createDateTime(reserveDate, 16),
    };
  }
  function createDateTime(date: string, hours: number) {
    const [year, month, day] = date.split("-").map(Number);

    const result = new Date(
        year,
        month - 1,
        day,
        hours,
        0,
        0
    );

    return result.toISOString();
  }
  async function handleReserve(
      resource: "seat" | "room",
      id: number
  ) {
    try {
      let startTime: string;
      let endTime: string;

      if (period === "before") {
        startTime = createDateTime(reserveDate, 8);
        endTime = createDateTime(reserveDate, 12);
      } else if (period === "after") {
        startTime = createDateTime(reserveDate, 12);
        endTime = createDateTime(reserveDate, 16);
      } else {
        startTime = createDateTime(reserveDate, 8);
        endTime = createDateTime(reserveDate, 16);
      }

      console.log("Reservation:", {
        resource,
        id,
        startTime,
        endTime,
      });

      const currentUserId = 1
      await createReservation({
        userId: currentUserId,

        ...(resource === "seat"
            ? { seatId: id }
            : { meetingRoomId: id }),

        startTime,
        endTime,
      });

      alert("Reservation created!");

      const [seatData, roomData] = await Promise.all([
        getSeats(),
        getRooms(),
      ]);

      setSeats(seatData);
      setRooms(roomData);

    } catch (error) {
      console.error(error);

      alert(
          error instanceof Error
              ? error.message
              : "Could not create reservation"
      );
    }
  }
  function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    async function loadData() {
      try {
        const [seatData, roomData] = await Promise.all([
          getSeats(),
          getRooms(),
        ]);

        setSeats(seatData);
        setRooms(roomData);
      } catch (error) {
        console.error(error);
        setError("Could not load booking data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  useEffect(() => {
    async function loadAvailability() {
      if (seats.length === 0 && rooms.length === 0) {
        return;
      }

      try {
        const { startTime, endTime } = getReservationTimes();

        const [seatResults, roomResults] = await Promise.all([
          Promise.all(
              seats.map((seat) =>
                  checkSeatAvailability(
                      seat.id,
                      startTime,
                      endTime
                  )
              )
          ),
          Promise.all(
              rooms.map((room) =>
                  checkRoomAvailability(
                      room.id,
                      startTime,
                      endTime
                  )
              )
          ),
        ]);

        setSeatAvailability(
            Object.fromEntries(
                seatResults.map((result) => [
                  result.seatId,
                  result.available,
                ])
            )
        );

        setRoomAvailability(
            Object.fromEntries(
                roomResults.map((result) => [
                  result.meetingRoomId,
                  result.available,
                ])
            )
        );
      } catch (error) {
        console.error(
            "Failed to load availability:",
            error
        );
      }
    }

    loadAvailability();
  }, [reserveDate, period, seats, rooms]);
  const availableSeats = seats.filter(
      (seat) =>
          seat.status === "available" &&
          seatAvailability[seat.id]
  );

  const availableRooms = rooms.filter(
      (room) =>
          room.status === "available" &&
          roomAvailability[room.id]
  );
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <main className="booking-page">

        {/* Header */}

        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">F</div>
            <span>FunkySeats</span>
          </div>

          <button className="profile-button">
            Log in
          </button>
          <select>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </header>

        {/* Main */}

        <div className="container">

          <div className="page-heading">
            <div>
              <p className="eyebrow">OFFICE BOOKING</p>

              <h1>
                {view === "seats"
                    ? "Choose your seat"
                    : "Choose a meeting room"}
              </h1>

              <p className="location">
                Innspurten 9 · Oslo
              </p>
            </div>

            <select className="room-select">
              <option>Innspurten 9</option>
            </select>
          </div>

          {/* Date + Time */}

          <section className="filters">

            <div>
              <label>Date</label>
              <input
                  type="date"
                  value={reserveDate}
                  min={getToday()}
                  onChange={(e) => setReserveDate(e.target.value)}
              />
            </div>

            <div className="period-container">
              <label>Time</label>

              <div className="period-buttons">

                <button
                    className={period === "before" ? "active" : ""}
                    onClick={() => setPeriod("before")}
                >
                  Morning
                </button>

                <button
                    className={period === "after" ? "active" : ""}
                    onClick={() => setPeriod("after")}
                >
                  Afternoon
                </button>

                <button
                    className={period === "all" ? "active" : ""}
                    onClick={() => setPeriod("all")}
                >
                  All day
                </button>

              </div>
            </div>

          </section>

          {/* Seats / Meeting Rooms buttons */}

          <div className="view-buttons">

            <button
                className={view === "seats" ? "active" : ""}
                onClick={() => setView("seats")}
            >
              Seats
            </button>

            <button
                className={view === "rooms" ? "active" : ""}
                onClick={() => setView("rooms")}
            >
              Meeting Rooms
            </button>

          </div>

          {/* Seats */}

          {view === "seats" && (
              <section className="seat-section">

                <div className="section-header">
                  <div>
                    <h2>Seats</h2>
                    <p>
                      Select an available seat to reserve it.
                    </p>
                  </div>

                  <span className="available-count">
                {availableSeats.length} available
              </span>
                </div>

                <div className="seat-grid">

                  {seats.map((seat) => {
                    const available =
                        seat.status === "available" &&
                        seatAvailability[seat.id];
                    return (
                        <div
                            key={seat.id}
                            className={`seat ${
                                !available ? "disabled" : ""
                            }`}
                        >

                          <div className="seat-top">

                      <span className="seat-id">
                        {seat.name}
                      </span>

                            <span
                                className={`status ${
                                    available
                                        ? "available"
                                        : "unavailable"
                                }`}
                            >
                        {available
                            ? "Available"
                            : "Taken"}
                      </span>

                          </div>

                          <div className="seat-info">

                            <strong>
                              {seat.type || "Standard"}
                            </strong>

                            <span>
                        Desk seat
                      </span>

                          </div>

                          <button
                              className="reserve-button"
                              disabled={!available}
                              onClick={() => {
                                if (available) {
                                  handleReserve("seat", seat.id);
                                }
                              }}
                          >
                            {available ? "Reserve" : "Unavailable"}
                          </button>

                        </div>
                    );
                  })}

                </div>
              </section>
          )}

          {/* Meeting Rooms */}

          {view === "rooms" && (
              <section className="seat-section">

                <div className="section-header">
                  <div>
                    <h2>Meeting Rooms</h2>

                    <p>
                      Select an available meeting room
                      to reserve it.
                    </p>
                  </div>

                  <span className="available-count">
                {availableRooms.length} available
              </span>
                </div>

                <div className="seat-grid">

                  {rooms.map((room) => {
                    const available =
                        room.status === "available" &&
                        roomAvailability[room.id];
                    return (
                        <div
                            key={room.id}
                            className={`seat ${
                                !available ? "disabled" : ""
                            }`}
                        >

                          <div className="seat-top">

                      <span className="seat-id">
                        {room.name}
                      </span>

                            <span
                                className={`status ${
                                    available
                                        ? "available"
                                        : "unavailable"
                                }`}
                            >
                        {available
                            ? "Available"
                            : "Taken"}
                      </span>

                          </div>

                          <div className="seat-info">

                            <strong>
                              Capacity:{" "}
                              {room.capacity ?? "Unknown"}
                            </strong>

                            <span>
                        Meeting room
                      </span>

                          </div>

                          <button
                              className="reserve-button"
                              disabled={!available}
                              onClick={() => {
                                if (available) {
                                  handleReserve("room", room.id);
                                }
                              }}
                          >
                            {available ? "Reserve" : "Unavailable"}
                          </button>

                        </div>
                    );
                  })}

                </div>
              </section>
          )}

        </div>
      </main>
  );
}