# CloudDesk

CloudDesk is a full-stack IT support ticketing system built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite. The app allows users to create, view, update, and delete internal IT support tickets while tracking ticket priority and resolution status.

## Features

* Create IT support tickets
* Select ticket category: Password, VPN, Laptop, Printer, Software, or Other
* Select priority: Low, Medium, or High
* Update ticket status: Open, In Progress, or Resolved
* Delete resolved or duplicate tickets
* View dashboard statistics for open, in-progress, and resolved tickets
* Store ticket data using Prisma ORM and SQLite
* Built with a responsive dashboard UI

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* Prisma ORM
* SQLite
* REST API Routes
* Git and GitHub

## API Routes

| Method | Route               | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/tickets`      | Get all tickets      |
| POST   | `/api/tickets`      | Create a new ticket  |
| PATCH  | `/api/tickets/[id]` | Update ticket status |
| DELETE | `/api/tickets/[id]` | Delete a ticket      |

## Database Model

```prisma
model Ticket {
  id        Int      @id @default(autoincrement())
  title     String
  category  String
  priority  String
  status    String   @default("Open")
  notes     String?
  createdAt DateTime @default(now())
}
```

## How to Run Locally

Install dependencies:

```bash
npm install
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Project Purpose

This project was created to demonstrate full-stack development and cloud deployment skills for software engineering, IT support, and cloud support roles. CloudDesk simulates a basic enterprise help desk workflow using ticket creation, status tracking, priority management, and database-backed CRUD operations.

## Future Improvements

* Deploy to Microsoft Azure App Service
* Add GitHub Actions CI/CD deployment
* Replace SQLite with Azure SQL Database or PostgreSQL
* Add user authentication
* Add ticket owner assignment
* Add search and filtering
* Add ticket comments and audit history
