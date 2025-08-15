export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export const ORDER_STATUS_VALUES = Object.values(OrderStatus);
export const ORDER_STATUS_KEYS = Object.keys(OrderStatus);
