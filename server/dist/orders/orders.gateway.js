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
import { WebSocketGateway, WebSocketServer, SubscribeMessage, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets';
let OrdersGateway = class OrdersGateway {
    server;
    handleConnection(client) {
        console.log(`WS client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`WS client disconnected: ${client.id}`);
    }
    emitNewOrder(order) {
        this.server.to('admin').emit('new_order', order);
    }
    emitStatusUpdate(orderId, status) {
        this.server.emit('order_status_update', { orderId, status });
    }
    handleAdminJoin(client) {
        client.join('admin');
        return { event: 'joined', data: 'Admin room joined' };
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], OrdersGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage('admin_join'),
    __param(0, ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket]),
    __metadata("design:returntype", void 0)
], OrdersGateway.prototype, "handleAdminJoin", null);
OrdersGateway = __decorate([
    WebSocketGateway({
        cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true },
        namespace: '/orders',
    })
], OrdersGateway);
export { OrdersGateway };
//# sourceMappingURL=orders.gateway.js.map