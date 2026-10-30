import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column('text', { nullable: true })
  refreshToken: string | null; // hashed refresh token for blacklist check

  @CreateDateColumn()
  createdAt: Date;
}
