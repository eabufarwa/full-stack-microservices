import { Injectable, Inject } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
