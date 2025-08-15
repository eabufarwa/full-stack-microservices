import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity({ name: 'orders' })
@Index(['productId'], { unique: false })
@Index(['status'], { unique: false })
@Index(['quantity'], { unique: false })
@Index(['createdAt'], { unique: false })
@Index(['updatedAt'], { unique: false })
@Index(['productId', 'status'], { unique: false })
@Index(['status', 'createdAt'], { unique: false })
@Index(['productId', 'createdAt'], { unique: false })
@Index(['createdAt', 'updatedAt'], { unique: false })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'uuid',
    nullable: false
  })
  productId: string;

  @Column({ 
    type: 'int',
    nullable: false
  })
  @Check('quantity >= 1')
  quantity: number;

  @Column({ 
    default: OrderStatus.CREATED,
    length: 50,
    nullable: false,
    type: 'varchar'
  })
  status: OrderStatus;

  @Column({ 
    length: 120,
    nullable: false,
    type: 'varchar'
  })
  @Check('LENGTH(productName) >= 1')
  productName: string;

  @Column('decimal', { 
    precision: 12, 
    scale: 2,
    nullable: false
  })
  @Check('productPrice >= 0')
  productPrice: number;

  @CreateDateColumn({
    type: 'datetime',
    precision: 3
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 3
  })
  updatedAt: Date;
}
