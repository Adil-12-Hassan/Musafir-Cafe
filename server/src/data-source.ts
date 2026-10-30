import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Admin } from './auth/admin.entity.js';
import { MenuItem } from './menu/menu.entity.js';
import { Order } from './orders/order.entity.js';
import { InitialPostgresSchema1730000000000 } from './migrations/1730000000000-InitialPostgresSchema.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be set to run PostgreSQL migrations.');
}

export const dataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  extra: { max: 2 },
  entities: [MenuItem, Order, Admin],
  migrations: [InitialPostgresSchema1730000000000],
  migrationsTableName: 'migrations',
});
