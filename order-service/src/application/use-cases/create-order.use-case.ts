import { Injectable, Inject } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import type { IProductService } from '../../domain/services/product-service.interface';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { Quantity } from '../../domain/value-objects/quantity.vo';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { ProductNotFoundForOrderException } from '../../domain/exceptions/order-domain.exception';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Order> {
    try {
      const product = await this.productService.getProductById(dto.productId);
      
      const order = new Order();
      order.id = OrderId.create().getValue();
      order.productId = dto.productId;
      order.quantity = Quantity.fromNumber(dto.quantity).getValue();
      order.status = OrderStatus.CREATED;
      order.productName = product.name;
      order.productPrice = product.price;

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new ProductNotFoundForOrderException(dto.productId);
    }
  }
}
