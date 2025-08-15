import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
  Check,
} from 'typeorm';

@Entity({ name: 'products' })
@Index(['name'], { unique: false })
@Index(['price'], { unique: false })
@Index(['createdAt'], { unique: false })
@Index(['updatedAt'], { unique: false })
@Index(['name', 'price'], { unique: false })
@Index(['createdAt', 'updatedAt'], { unique: false })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    length: 120, 
    nullable: false,
    type: 'varchar'
  })
  @Check('LENGTH(name) >= 1')
  name: string;

  @Column({ 
    type: 'text', 
    nullable: true,
    default: null
  })
  description?: string | null;

  @Column('decimal', { 
    precision: 12, 
    scale: 2,
    nullable: false
  })
  @Check('price >= 0')
  price: number;

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
