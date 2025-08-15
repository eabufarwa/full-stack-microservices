import { OrderStatus } from '../enums/order-status.enum';

export interface OrderSnapshot {
  id: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  productName: string;
  productPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilters {
  productId?: string;
  status?: OrderStatus;
  minQuantity?: number;
  maxQuantity?: number;
  createdAfter?: Date;
  createdBefore?: Date;
  limit?: number;
  offset?: number;
}

export interface OrderSearchCriteria {
  productId?: string;
  status?: OrderStatus;
  quantityRange?: {
    min: number;
    max: number;
  };
  createdAfter?: Date;
  createdBefore?: Date;
}
