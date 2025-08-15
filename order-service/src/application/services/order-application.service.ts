import { Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';
import { GetOrderUseCase } from '../use-cases/get-order.use-case';
import { ListOrdersUseCase } from '../use-cases/list-orders.use-case';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class OrderApplicationService {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return await this.createOrderUseCase.execute(dto);
  }

  async getOrder(id: string): Promise<Order> {
    return await this.getOrderUseCase.execute(id);
  }

  async listOrders(): Promise<Order[]> {
    return await this.listOrdersUseCase.execute();
  }
}
