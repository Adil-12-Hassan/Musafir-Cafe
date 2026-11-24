# ☕ Musafir Cafe

### A little pause along the way.

Musafir Cafe is a full-stack cafe ordering platform designed to simplify the customer ordering experience and daily cafe operations.

Customers can explore the menu, choose drink sizes, place orders, receive a digital receipt, and track preparation progress. Cafe staff can manage menu items, monitor incoming orders, and update order statuses through a dedicated admin dashboard.

<p align="center">
  <strong>Good Coffee. Warm Company. Better Journeys.</strong>
</p>

---

## ✨ Features

### 🛍️ Customer Experience
- Browse the cafe menu.
- Filter drinks by category.
- Select medium and large drink sizes.
- View item descriptions, ingredients, and prices.
- Add and remove items from the shopping cart.
- Update item quantities.
- Place orders with customer details and special notes.
- Receive a unique order reference.
- Download a digital receipt.
- Track order preparation progress.

### 🛠️ Admin Dashboard
- Secure administrator login.
- View daily order statistics.
- Monitor today's revenue.
- View recent orders.
- Manage incoming orders.
- Update order preparation status.
- View completed orders and order history.
- Add, edit, hide, and remove menu items.

### 🔐 Authentication
- Administrator authentication.
- Short-lived access tokens.
- HTTP-only refresh-token cookie.
- Hashed passwords and refresh tokens.
- Protected administration routes.

### ⚡ Order Management
- Unique order references (`MSF-XXXX`).
- Automatic order board polling every five seconds.
- Order status tracking.
- Order history.
- Daily revenue and status statistics.

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 7 |
| State Management | Zustand 5 |
| HTTP Client | Axios |
| Backend | NestJS 12 |
| Backend Language | TypeScript |
| ORM | TypeORM |
| Local Database | SQLite |
| Production Database | PostgreSQL |
| Authentication | Passport, JWT, bcrypt |
| Receipt Generation | html2canvas |

---

## 🏗️ Project Structure

```text
Musafir-Cafe/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       │   └── admin/
│       ├── store/
│       ├── api/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── auth/
│   │   ├── menu/
│   │   ├── orders/
│   │   ├── dashboard/
│   │   ├── migrations/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── configure-app.ts
│   │
│   ├── test/
│   ├── .env.example
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Adil-12-Hassan/Musafir-Cafe.git
cd Musafir-Cafe
```

### 2. Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 3. Configure the backend

Create `server/.env`:

```env
PORT=3001

CLIENT_URL=http://localhost:5173

DATABASE_PATH=musafir.db

# PostgreSQL for production
DATABASE_URL=

# Initial administrator account
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password

# Authentication secrets
JWT_SECRET=your-long-random-access-secret
JWT_REFRESH_SECRET=your-different-random-refresh-secret
```

The application uses SQLite locally when `DATABASE_URL` is not configured.

For production, configure a PostgreSQL connection string.

**Important:** Keep `.env` files private. Initial admin credentials are used when no administrator account exists in the database.

### 4. Start the backend

```bash
npm run start:dev
```

Backend API:

```text
http://localhost:3001/api
```

### 5. Start the frontend

Open another terminal:

```bash
npm run client:dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔌 API Documentation

Base URL:

```text
http://localhost:3001/api
```

### Authentication — `/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Administrator login |
| POST | `/refresh` | Refresh access token |
| POST | `/logout` | Administrator logout |

### Menu — `/menu`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get available menu items |
| GET | `/:id` | Get a menu item |
| POST | `/` | Create menu item |
| PATCH | `/:id` | Update menu item |
| DELETE | `/:id` | Hide menu item |

### Orders — `/orders`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Place a customer order |
| GET | `/track/:orderId` | Track an order |
| GET | `/` | Retrieve orders (admin) |
| PATCH | `/:id/status` | Update order status (admin) |

### Dashboard — `/dashboard`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats` | Retrieve today's statistics |

Protected endpoints require an access token:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 📦 Order Workflow

```text
Customer visits website
        |
        v
   Browse Menu
        |
        v
   Add to Cart
        |
        v
    Checkout
        |
        v
    Place Order
        |
        v
   Order Created
        |
        v
    Received
        |
        v
    Preparing
        |
        v
      Ready
        |
        v
       Done
```

Each order receives a unique reference that customers can use to check its status.

---

## 📊 Admin Dashboard

The administration dashboard provides:

- Today's order count.
- Today's revenue.
- Order status breakdown.
- Recent order overview.
- Live order management.
- Menu management.
- Order history.

The live order page refreshes automatically every five seconds using HTTP polling.

---

## 🗄️ Database

Musafir Cafe uses TypeORM with two database configurations:

| Environment | Database |
|---|---|
| Local development | SQLite |
| Production | PostgreSQL |

Main entities:

- `Admin` — administrator accounts and refresh-token hashes.
- `MenuItem` — cafe products, prices, ingredients, and availability.
- `Order` — customer information, ordered items, totals, and status.

PostgreSQL schema migration:

```bash
npm --prefix server run migration:run
```

The SQLite development database is not automatically transferred to PostgreSQL.

---

## 🧪 Useful Commands

| Command | Purpose |
|---|---|
| `npm run start:dev` | Start backend in watch mode |
| `npm run client:dev` | Start frontend |
| `npm run build` | Build backend |
| `npm --prefix client run build` | Build frontend |
| `npm test` | Run backend unit tests |
| `npm run test:e2e` | Run backend E2E tests |
| `npm run lint` | Lint backend |
| `npm --prefix client run lint` | Lint frontend |

---

## ▲ Deployment

The backend includes a Vercel configuration.

For production deployment:

1. Deploy the frontend.
2. Deploy the backend with the `server` directory as its root.
3. Provision a PostgreSQL database.
4. Configure `DATABASE_URL`.
5. Configure `CLIENT_URL` with the frontend origin.
6. Set strong `ADMIN_USERNAME` and `ADMIN_PASSWORD` values.
7. Configure separate `JWT_SECRET` and `JWT_REFRESH_SECRET` values.
8. Run the PostgreSQL migration.
9. Set frontend `VITE_API_URL` to the deployed API URL.

The admin order board uses polling rather than persistent WebSocket connections.

---

## 🗺️ Application Routes

### Customer Website

| Page | Route |
|---|---|
| Home | `/` |
| Menu | `/menu` |
| Order Tracking | `/track` |
| About | `/about` |

### Administration

| Page | Route |
|---|---|
| Admin Login | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Live Orders | `/admin/orders` |
| Menu Manager | `/admin/menu` |
| Order History | `/admin/history` |

---

## 🚧 Future Improvements

- Server-side price verification.
- Improved order tracking security.
- Customer order history.
- Online payment integration.
- Kitchen display system.
- Printable order tickets.
- Inventory management.
- Sales reports and analytics.
- Automated notifications.
- Improved mobile ordering experience.

---

## 👨‍💻 Developer

**Adil Hassan**

- GitHub: [@Adil-12-Hassan](https://github.com/Adil-12-Hassan)
- Repository: [Musafir Cafe](https://github.com/Adil-12-Hassan/Musafir-Cafe)

---

<p align="center">
  Made with ❤️ and ☕
  <br />
  <strong>Musafir Cafe - A little pause along the way.</strong>
</p>
