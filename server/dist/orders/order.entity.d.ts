export declare enum OrderStatus {
    RECEIVED = "received",
    PREPARING = "preparing",
    READY = "ready",
    DONE = "done"
}
export interface OrderItem {
    menuItemId: number;
    name: string;
    size: 'medium' | 'large';
    price: number;
    quantity: number;
}
export declare class Order {
    id: number;
    orderId: string;
    customerName: string;
    customerPhone: string;
    items: OrderItem[];
    total: number;
    status: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
