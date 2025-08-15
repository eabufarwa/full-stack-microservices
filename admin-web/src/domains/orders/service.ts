import { api, http } from '@/lib/api';
import type { Order, CreateOrderRequest } from '@/types/contracts';

export type CreateOrderInput = CreateOrderRequest;

export const orderService = {
  list: () => http.get<Order[]>(api.url('/orders')),
  create: (input: CreateOrderInput) => http.post<Order>(api.url('/orders'), input),
  getById: (id: string) => http.get<Order>(api.url(`/orders/${id}`)),
};


