# ☕ Musafir Cafe

A full-stack cafe ordering app for browsing the menu, placing orders, and following them from the kitchen to pickup. Cafe staff can manage the menu and orders through a live admin dashboard.

## ✨ Features

- 🍽️ Browse the cafe menu and add items to a cart
- 🧾 Place an order and track its status
- 🔄 Keep the admin order board up to date with automatic polling
- 🛠️ Admin dashboard with order statistics, live orders, order history, and menu management
- 🔐 Protected admin routes with access and refresh token authentication
- 💾 SQLite for local development and PostgreSQL for production data

## 🧰 Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Zustand |
| Backend | NestJS, TypeScript, TypeORM |
| Database | SQLite locally; PostgreSQL in production |
| Order updates | HTTP polling |

## 📁 Project Structure

```text
musafir-cafe/
├── client/    # React + Vite customer site and admin dashboard
├── server/    # NestJS API, authentication, and Vercel entry point
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
# For production, set DATABASE_URL to your managed PostgreSQL connection string.
DATABASE_URL=
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
| `npm --prefix server run migration:run` | Create/update the PostgreSQL schema |

## ▲ Deploy the API to Vercel

Create a Vercel project for this repository and set its **Root Directory** to `server`. The included [`server/vercel.json`](./server/vercel.json) configures the install and build commands; leave **Output Directory** blank.

Add these environment variables in Vercel:

- `DATABASE_URL` - managed PostgreSQL connection string (use the provider's pooled URL if available)
- `CLIENT_URL` - deployed frontend origin, such as `https://your-site.vercel.app`
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` - used to create the first admin account
- `JWT_SECRET` and `JWT_REFRESH_SECRET` - two different, long, randomly generated secrets

Before deploying, run `npm run migration:run` from the `server` directory with `DATABASE_URL` set to create the PostgreSQL schema. The API seeds the initial admin and menu when their tables are empty. The SQLite database is not automatically copied to PostgreSQL; import existing menu and order data separately if needed.

The admin order board polls every five seconds instead of using Socket.IO, because Vercel Functions do not keep a persistent WebSocket connection. Set the frontend's `VITE_API_URL` to `https://your-api.vercel.app/api`.

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