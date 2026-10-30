import { OrdersService } from './orders.service.js';
import { OrdersGateway } from './orders.gateway.js';
export declare class OrdersController {
    private ordersService;
    private ordersGateway;
    constructor(ordersService: OrdersService, ordersGateway: OrdersGateway);
    create(body: any): Promise<import("./order.entity.js").Order>;
    track(orderId: string): Promise<import("./order.entity.js").Order>;
    findAll(status?: string): Promise<import("./order.entity.js").Order[]>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<import("./order.entity.js").Order>;
}
