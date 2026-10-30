import { OrdersService } from '../orders/orders.service.js';
export declare class DashboardController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getStats(): Promise<{
        total: number;
        revenue: number;
        byStatus: Record<string, number>;
    }>;
}
