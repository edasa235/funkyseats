# FunkySeats

FunkySeats is a full-stack reservation system for office seats and meeting rooms.

Users can view available resources and create reservations for a specific time period. Admins can activate or deactivate seats.

## Features

* View seats and meeting rooms
* Check availability
* Create, update and delete reservations
* Prevent overlapping reservations
* Activate/deactivate seats
* Admin-only seat management
* Swagger API documentation

## Technologies

* Next.js
* TypeScript
* Fastify
* PostgreSQL
* Drizzle ORM
* Swagger / OpenAPI
* Docker
* GitHub

## Architecture

```text
Next.js
   ↓
Fastify API
   ↓
Drizzle ORM
   ↓
PostgreSQL
```

## Database

Main tables:

* `users`
* `roles`
* `seats`
* `meeting_rooms`
* `reservations`

A reservation can belong to either a seat or a meeting room.

## Running the project

Install dependencies:

```bash
npm install
```

Start the database:

```bash
docker compose up -d db
```

Start the backend:

```bash
npm run dev:backend
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on `localhost:3000` and the backend on `localhost:3001`.

Swagger is available through the backend documentation.

## Security

The backend checks:

* Valid reservation times
* Resource availability
* Overlapping reservations
* User roles for admin actions
* Deactivated resources

The project does not include real authentication. The User/Admin selector is only used to demonstrate role-based authorization.

## Limitations

* No real login/authentication
* Limited automated testing
* UI could be improved further

## Future improvements

* Real authentication
* More automated tests
* Improved UI
* User reservation history

## Project

School project demonstrating full-stack development, REST APIs, database design, validation, and role-based authorization.
