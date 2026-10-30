import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  private generateOrderId(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `MSF-${num}`;
  }

  async create(data: { customerName: string; customerPhone: string; items: any[]; notes?: string }) {
    let orderId: string = this.generateOrderId();
    let exists = true;

    // Ensure unique order ID
    while (exists) {
      orderId = this.generateOrderId();
      const found = await this.orderRepo.findOne({ where: { orderId } });
      exists = !!found;
    }

    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = this.orderRepo.create({
      orderId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items,
      total,
      notes: data.notes,
      status: OrderStatus.RECEIVED,
    });

    return this.orderRepo.save(order);
  }

  async findByOrderId(orderId: string) {
    const order = await this.orderRepo.findOne({ where: { orderId: orderId.toUpperCase() } });
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    return order;
  }

  findAll(status?: string) {
    if (status) return this.orderRepo.find({ where: { status }, order: { createdAt: 'DESC' } });
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string) {
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BadRequestException('Invalid order status');
    }
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.orderRepo.save(order);
  }

  async getTodayStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await this.orderRepo
      .createQueryBuilder('order')
      .where('order.createdAt >= :today', { today })
      .getMany();

    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const byStatus = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total: orders.length, revenue, byStatus };
  }
}
