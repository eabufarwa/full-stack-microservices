import { Injectable } from '@nestjs/common';
import { Quantity } from '../value-objects/quantity.vo';
import { Price } from '../value-objects/price.vo';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderDomainService {
  calculateOrderTotal(quantity: Quantity, unitPrice: Price): Price {
    const total = quantity.getValue() * unitPrice.getValue();
    return Price.fromNumber(total);
  }

  validateOrderQuantity(quantity: number): boolean {
    return quantity >= 1;
  }

  validateOrderStatus(status: OrderStatus): boolean {
    return Object.values(OrderStatus).includes(status);
  }

  canCancelOrder(status: OrderStatus): boolean {
    const cancellableStatuses = [OrderStatus.CREATED, OrderStatus.PROCESSING];
    return cancellableStatuses.includes(status);
  }

  canUpdateOrder(status: OrderStatus): boolean {
    const updatableStatuses = [OrderStatus.CREATED];
    return updatableStatuses.includes(status);
  }

  getNextStatus(currentStatus: OrderStatus): OrderStatus {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      [OrderStatus.CREATED]: OrderStatus.PROCESSING,
      [OrderStatus.PROCESSING]: OrderStatus.SHIPPED,
      [OrderStatus.SHIPPED]: OrderStatus.DELIVERED,
      [OrderStatus.DELIVERED]: OrderStatus.DELIVERED,
      [OrderStatus.CANCELLED]: OrderStatus.CANCELLED,
    };
    
    return statusFlow[currentStatus];
  }
}
