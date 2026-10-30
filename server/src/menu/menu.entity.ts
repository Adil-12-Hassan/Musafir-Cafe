import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DrinkSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum DrinkCategory {
  ICED_COFFEE = 'iced_coffee',
  HOT_COFFEE = 'hot_coffee',
  SPECIAL = 'special',
}

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column('int')
  priceM: number;

  @Column('int')
  priceL: number;

  @Column('simple-array', { nullable: true })
  ingredients: string[];

  @Column({ default: true })
  available: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
