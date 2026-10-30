import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true },
  namespace: '/orders',
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`WS client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`WS client disconnected: ${client.id}`);
  }

  // Called from OrdersService when new order arrives
  emitNewOrder(order: any) {
    this.server.to('admin').emit('new_order', order);
  }

  // Called from OrdersService when status updates
  emitStatusUpdate(orderId: string, status: string) {
    this.server.emit('order_status_update', { orderId, status });
  }

  @SubscribeMessage('admin_join')
  handleAdminJoin(@ConnectedSocket() client: Socket) {
    client.join('admin');
    return { event: 'joined', data: 'Admin room joined' };
  }
}
