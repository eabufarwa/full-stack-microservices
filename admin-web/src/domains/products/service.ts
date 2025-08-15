import { api, http } from '@/lib/api';
import type { Product, CreateProductRequest, UpdateProductRequest } from '@/types/contracts';

export type CreateProductInput = CreateProductRequest;
export type UpdateProductInput = UpdateProductRequest;

export const productService = {
  list: () => http.get<Product[]>(api.url('/products')),
  create: (input: CreateProductInput) => http.post<Product>(api.url('/products'), input),
  getById: (id: string) => http.get<Product>(api.url(`/products/${id}`)),
  update: (id: string, input: UpdateProductInput) => http.put<Product>(api.url(`/products/${id}`), input),
  delete: (id: string) => http.delete(api.url(`/products/${id}`)),
};


