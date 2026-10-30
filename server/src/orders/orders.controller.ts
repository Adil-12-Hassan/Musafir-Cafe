import { Controller, Get, Post, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // Public - customer places order
  @Post()
  async create(@Body() body: any) {
    return this.ordersService.create(body);
  }

  // Public - customer tracks by order ID
  @Get('track/:orderId')
  track(@Param('orderId') orderId: string) {
    return this.ordersService.findByOrderId(orderId);
  }

  // Admin only
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('status') status?: string) {
    return this.ordersService.findAll(status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(+id, body.status);
  }
}
