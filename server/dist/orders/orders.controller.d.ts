import { OrdersService } from './orders.service.js';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(body: any): Promise<import("./order.entity.js").Order>;
    track(orderId: string): Promise<import("./order.entity.js").Order>;
    findAll(status?: string): Promise<import("./order.entity.js").Order[]>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<import("./order.entity.js").Order>;
}
