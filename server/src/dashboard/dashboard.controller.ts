import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { OrdersService } from '../orders/orders.service.js';

@Controller('dashboard')
export class DashboardController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.ordersService.getTodayStats();
  }
}
