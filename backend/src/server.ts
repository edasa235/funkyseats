import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { seatsRoutes } from "./routes/seats";
const app = Fastify({
    logger: true
});

async function start() {
    await app.register(swagger, {
        openapi: {
            info: {
                title: "FunkySeats API",
                description: "API for the FunkySeats office seat reservation system",
                version: "1.0.0"
            }
        }
    });

    await app.register(swaggerUi, {
        routePrefix: "/docs"
    });

    await app.register(seatsRoutes);

    app.get("/", async () => {
        return {
            message: "FunkySeats API"
        };
    });

    await app.listen({
        port: 3000,
        host: "0.0.0.0"
    });
}
start();