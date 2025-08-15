import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { OrderFilters, OrderSearchCriteria } from '../../domain/types/order.types';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findById(id: OrderId): Promise<Order | null> {
    return await this.repository.findOne({
      where: { id: id.getValue() },
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }

  async update(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }

  async delete(id: OrderId): Promise<void> {
    await this.repository.delete(id.getValue());
  }

  async findByProductId(productId: string): Promise<Order[]> {
    return await this.repository.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.repository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }

  async findByFilters(filters: OrderFilters): Promise<Order[]> {
    const queryBuilder = this.repository.createQueryBuilder('order');
    
    if (filters.productId) {
      queryBuilder.andWhere('order.productId = :productId', { productId: filters.productId });
    }
    
    if (filters.status) {
      queryBuilder.andWhere('order.status = :status', { status: filters.status });
    }
    
    if (filters.minQuantity) {
      queryBuilder.andWhere('order.quantity >= :minQuantity', { minQuantity: filters.minQuantity });
    }
    
    if (filters.maxQuantity) {
      queryBuilder.andWhere('order.quantity <= :maxQuantity', { maxQuantity: filters.maxQuantity });
    }
    
    if (filters.createdAfter) {
      queryBuilder.andWhere('order.createdAt >= :createdAfter', { createdAfter: filters.createdAfter });
    }
    
    if (filters.createdBefore) {
      queryBuilder.andWhere('order.createdAt <= :createdBefore', { createdBefore: filters.createdBefore });
    }
    
    queryBuilder.orderBy('order.createdAt', 'DESC');
    
    if (filters.limit) {
      queryBuilder.limit(filters.limit);
    }
    
    if (filters.offset) {
      queryBuilder.offset(filters.offset);
    }
    
    return await queryBuilder.getMany();
  }

  async search(criteria: OrderSearchCriteria): Promise<Order[]> {
    const queryBuilder = this.repository.createQueryBuilder('order');
    
    if (criteria.productId) {
      queryBuilder.andWhere('order.productId = :productId', { productId: criteria.productId });
    }
    
    if (criteria.status) {
      queryBuilder.andWhere('order.status = :status', { status: criteria.status });
    }
    
    if (criteria.quantityRange) {
      queryBuilder.andWhere('order.quantity >= :minQuantity', { minQuantity: criteria.quantityRange.min });
      queryBuilder.andWhere('order.quantity <= :maxQuantity', { maxQuantity: criteria.quantityRange.max });
    }
    
    if (criteria.createdAfter) {
      queryBuilder.andWhere('order.createdAt >= :createdAfter', { createdAfter: criteria.createdAfter });
    }
    
    if (criteria.createdBefore) {
      queryBuilder.andWhere('order.createdAt <= :createdBefore', { createdBefore: criteria.createdBefore });
    }
    
    queryBuilder.orderBy('order.createdAt', 'DESC');
    
    return await queryBuilder.getMany();
  }

  async exists(id: OrderId): Promise<boolean> {
    const count = await this.repository.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }
}
