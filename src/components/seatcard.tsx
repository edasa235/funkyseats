import {Seat} from "../types/seats";

type SeatCardProps = {
    seat: Seat;
};

export default function SeatCard({ seat }: SeatCardProps) {
    const available = seat.status === "available";

    return (
        <div className={`seat ${!available ? "disabled" : ""}`}>
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
                    {available ? "Available" : "Taken"}
                </span>
            </div>

            <div className="seat-info">
                <strong>{seat.type || "Standard"}</strong>
                <span>Desk seat</span>
            </div>

            {available && (
                <button className="reserve-button">
                    Reserve
                </button>
            )}
        </div>
    );
}