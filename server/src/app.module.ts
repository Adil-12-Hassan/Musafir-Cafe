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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_PATH || 'musafir.db',
      entities: [MenuItem, Order, Admin],
      synchronize: true, // auto-creates tables in dev
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
