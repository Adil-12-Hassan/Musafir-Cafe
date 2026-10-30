import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller.js';
import { OrdersModule } from '../orders/orders.module.js';

@Module({
  imports: [OrdersModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
