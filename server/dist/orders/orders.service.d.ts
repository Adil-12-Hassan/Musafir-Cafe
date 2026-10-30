import { Repository } from 'typeorm';
import { Order } from './order.entity.js';
export declare class OrdersService {
    private orderRepo;
    constructor(orderRepo: Repository<Order>);
    private generateOrderId;
    create(data: {
        customerName: string;
        customerPhone: string;
        items: any[];
        notes?: string;
    }): Promise<Order>;
    findByOrderId(orderId: string): Promise<Order>;
    findAll(status?: string): Promise<Order[]>;
    updateStatus(id: number, status: string): Promise<Order>;
    getTodayStats(): Promise<{
        total: number;
        revenue: number;
        byStatus: Record<string, number>;
    }>;
}
