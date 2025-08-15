import { Order } from '../entities/order.entity';
import { OrderId } from '../value-objects/order-id.vo';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderFilters, OrderSearchCriteria } from '../types/order.types';

export interface IOrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: OrderId): Promise<void>;
  findByProductId(productId: string): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findByFilters(filters: OrderFilters): Promise<Order[]>;
  search(criteria: OrderSearchCriteria): Promise<Order[]>;
  exists(id: OrderId): Promise<boolean>;
}
