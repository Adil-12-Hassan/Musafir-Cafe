import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum OrderStatus {
  RECEIVED = 'received',
  PREPARING = 'preparing',
  READY = 'ready',
  DONE = 'done',
}

export interface OrderItem {
  menuItemId: number;
  name: string;
  size: 'medium' | 'large';
  price: number;
  quantity: number;
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderId: string; // MSF-XXXX

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column('simple-json')
  items: OrderItem[];

  @Column('int')
  total: number;

  @Column({ default: OrderStatus.RECEIVED })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
