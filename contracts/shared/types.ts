export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface ProductSnapshot {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSnapshot {
  id: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  productName: string;
  productPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export interface OrderFilters {
  productId?: string;
  status?: OrderStatus;
  minQuantity?: number;
  maxQuantity?: number;
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
  offset?: number;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: Array<{
    field?: string;
    message?: string;
  }>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  offset?: number;
}
