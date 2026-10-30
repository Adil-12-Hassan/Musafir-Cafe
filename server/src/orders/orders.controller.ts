import { Controller, Get, Post, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersGateway } from './orders.gateway.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private ordersGateway: OrdersGateway,
  ) {}

  // Public — customer places order
  @Post()
  async create(@Body() body: any) {
    const order = await this.ordersService.create(body);
    // Push to admin dashboard in real-time
    this.ordersGateway.emitNewOrder(order);
    return order;
  }

  // Public — customer tracks by order ID
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
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const order = await this.ordersService.updateStatus(+id, body.status);
    this.ordersGateway.emitStatusUpdate(order.orderId, order.status);
    return order;
  }
}
