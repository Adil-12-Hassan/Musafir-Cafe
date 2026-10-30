import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { MenuModule } from './menu/menu.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { MenuItem } from './menu/menu.entity.js';
import { Order } from './orders/order.entity.js';
import { Admin } from './auth/admin.entity.js';
import { InitialPostgresSchema1730000000000 } from './migrations/1730000000000-InitialPostgresSchema.js';

const databaseUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

if (isProduction && !databaseUrl) {
  throw new Error('DATABASE_URL must be set when running the API in production.');
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: databaseUrl ? 'postgres' : 'better-sqlite3',
      ...(databaseUrl
        ? {
            url: databaseUrl,
            extra: { max: 2 },
            migrations: [InitialPostgresSchema1730000000000],
            migrationsRun: false,
          }
        : { database: process.env.DATABASE_PATH || 'musafir.db' }),
      entities: [MenuItem, Order, Admin],
      synchronize: !isProduction,
    }),
    AuthModule,
    MenuModule,
    OrdersModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
