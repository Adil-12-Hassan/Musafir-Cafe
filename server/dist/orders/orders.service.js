var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity.js';
let OrdersService = class OrdersService {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    generateOrderId() {
        const num = Math.floor(1000 + Math.random() * 9000);
        return `MSF-${num}`;
    }
    async create(data) {
        let orderId = this.generateOrderId();
        let exists = true;
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
    async findByOrderId(orderId) {
        const order = await this.orderRepo.findOne({ where: { orderId: orderId.toUpperCase() } });
        if (!order)
            throw new NotFoundException(`Order ${orderId} not found`);
        return order;
    }
    findAll(status) {
        if (status)
            return this.orderRepo.find({ where: { status }, order: { createdAt: 'DESC' } });
        return this.orderRepo.find({ order: { createdAt: 'DESC' } });
    }
    async updateStatus(id, status) {
        if (!Object.values(OrderStatus).includes(status)) {
            throw new BadRequestException('Invalid order status');
        }
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new NotFoundException('Order not found');
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
        }, {});
        return { total: orders.length, revenue, byStatus };
    }
};
OrdersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Order)),
    __metadata("design:paramtypes", [Repository])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map