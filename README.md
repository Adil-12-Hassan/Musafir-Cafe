# ☕ Musafir Cafe

A full-stack cafe ordering app for browsing the menu, placing orders, and following them from the kitchen to pickup. Cafe staff can manage the menu and orders through a live admin dashboard.

## ✨ Features

- 🍽️ Browse the cafe menu and add items to a cart
- 🧾 Place an order and track its status
- ⚡ See new orders and status updates in real time
- 🛠️ Admin dashboard with order statistics, live orders, order history, and menu management
- 🔐 Protected admin routes with access and refresh token authentication
- 💾 SQLite database for menu items, orders, and admin accounts

## 🧰 Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Zustand |
| Backend | NestJS, TypeScript, TypeORM |
| Database | SQLite (`better-sqlite3`) |
| Real-time updates | Socket.IO |

## 📁 Project Structure

```text
musafir-cafe/
├── client/    # React + Vite customer site and admin dashboard
├── server/    # NestJS API, authentication, and WebSocket gateway
│   └── musafir.db # SQLite database
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

From the project root, install each app's dependencies:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### Configure the server

Create `server/.env` if you need to override the local defaults:

```env
PORT=3001
CLIENT_URL=http://localhost:5173
DATABASE_PATH=musafir.db
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=use-a-strong-unique-password
JWT_SECRET=replace-with-a-long-random-secret
JWT_REFRESH_SECRET=replace-with-a-different-long-random-secret
```

`DATABASE_PATH` is relative to the server's working directory unless you provide an absolute path.
Keep `server/.env` local and never commit it. The admin variables are used only when the database has no admin account; changing them does not reset an existing account.

The API defaults to `http://localhost:3001/api`, and the frontend uses that URL unless `VITE_API_URL` is set. For example, create `client/.env.local` to point the frontend at another API:

```env
VITE_API_URL=http://localhost:3001/api
```

### Start the app

Run the API and frontend in separate terminals from the project root:

```bash
npm run start:dev
```

```bash
npm run client:dev
```

Then open [Frontend](http://localhost:5173). The API is available at [Backend](http://localhost:3001/api).

## 🔑 Admin Access

On first startup, the server creates an admin account using `ADMIN_USERNAME` and `ADMIN_PASSWORD` from `server/.env`. Set both values before starting the server with a new database. Use `/admin/login` to access the dashboard.

For an existing database, update the admin account through your deployment's account-management process; changing the environment variables alone does not change existing credentials. Configure strong, unique admin credentials and JWT secrets before deployment.

## 🧪 Useful Commands

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start the NestJS API in watch mode |
| `npm run client:dev` | Start the Vite frontend |
| `npm run build` | Build the NestJS server |
| `npm --prefix client run build` | Type-check and build the frontend |
| `npm test` | Run server unit tests |
| `npm run test:e2e` | Run server end-to-end tests |
| `npm run lint` | Lint server source and tests |
| `npm --prefix client run lint` | Lint frontend source |

## 🗺️ Main Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Menu | `/menu` |
| Order tracking | `/track` |
| About | `/about` |
| Admin login | `/admin/login` |
| Admin dashboard | `/admin/dashboard` |
| Live orders | `/admin/orders` |
| Menu manager | `/admin/menu` |
| Order history | `/admin/history` |