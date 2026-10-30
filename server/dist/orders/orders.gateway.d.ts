import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitNewOrder(order: any): void;
    emitStatusUpdate(orderId: string, status: string): void;
    handleAdminJoin(client: Socket): {
        event: string;
        data: string;
    };
}
