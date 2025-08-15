import { Injectable, Inject } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { OrderNotFoundException } from '../../domain/exceptions/order-domain.exception';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const orderId = OrderId.fromString(id);
    const order = await this.orderRepository.findById(orderId);
    
    if (!order) {
      throw new OrderNotFoundException(id);
    }
    
    return order;
  }
}
