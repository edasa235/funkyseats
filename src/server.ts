import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { seatsRoutes } from "./routes/seats";
import { reservationsRoutes } from "./routes/reservations";
import { meetingRoomsRoutes } from "./routes/room";

const app = Fastify({ logger: true });

async function start() {
    await app.register(cors, {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    });

    await app.register(swagger, {
        openapi: {
            info: {
                title: "FunkySeats API",
                description: "API for the FunkySeats office seat reservation system",
                version: "1.0.0",
            },
        },
    });

    await app.register(swaggerUi, {
        routePrefix: "/docs",
    });

    await app.register(seatsRoutes);
    await app.register(reservationsRoutes);
    await app.register(meetingRoomsRoutes);

    app.get("/", async () => ({
        message: "FunkySeats API",
    }));

    await app.listen({
        port: 3001,
        host: "0.0.0.0",
    });
}

start();